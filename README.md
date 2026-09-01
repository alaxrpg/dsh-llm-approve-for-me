# dsh-llm-approve-for-me

一个 DeepSeek Harness（DSH）插件：当会话选择 **帮我批准** 权限预设时，每一笔有效的沙箱权限升级（Shell/PowerShell 命令、`write`/`edit` 文件写入等所有带 `sandbox_permissions` 的工具调用）都由插件内置的专用无工具审查角色判定（独立模型路由、无会话单次调用、快速裁决）。

## 设计边界

- **专用审查角色**：审查由插件内置的 `REVIEWER_ROLE`（固定 system persona、无工具、单请求快速裁决、严格 JSON 输出）执行，不借用环境里任何通用子代理角色模板。
- **不污染子代理列表**：审查直接通过 DSH `llm` 服务执行无会话单次调用，不创建 Agent/Session，因此不会在子代理 catalog 中留下条目，也不会累积历史上下文。
- 没有命令前缀、正则、白名单、黑名单、危险操作列表或其他规则判断。
- 不会绕过 DSH 的沙箱：每次允许只返回原生的 `allowed-once` 一次性授权。
- 审查 LLM 输出是唯一的自动决策来源：`allow` 允许一次、`deny` 拒绝、`ask` 交回原生人工审批。
- 覆盖面：`bash`/`pwsh` 传完整命令文本；`write`/`edit` 传文件路径 + 变更摘要（old/new 或 content，截断至 2000 字符防大文件刷屏）；其他带升级参数的工具从参数里尽力提取可审查目标。无法提取审查目标的请求交回人工。
- 每个会话顶部提供 **帮我批准** 面板：History 页按 session 隔离展示最近 100 条审批记录（请求目标、申请理由、目标权限、审查模型、AI 结论与最终结果）；Settings 页可视化调整审查模型配置。
- 缺失审查模型路由、超时、取消、模型调用异常或 JSON 输出无效时，同样交回人工审批；不会默许放行，且记录具体失败原因。

这不是安全产品，也不能替代人工授权、最小权限、备份或隔离。它的含义是把授权判断交给你在 DSH 中配置的 LLM，而不是交给本插件的命令规则。

## 安装

在 DSH profile 中安装 GitHub 包：

```sh
dsh plugin --profile web add github:alaxrpg/dsh-llm-approve-for-me
```

重启 DSH Web 后，包内的 [`dsh/cordis.patch.yml`](dsh/cordis.patch.yml) 会添加该权限预设、挂载插件，并把 **帮我批准** 设为新会话的默认预设（你仍可在设置页显式覆盖为其他预设；已存在的会话保留各自当前的预设）。点击会话顶部的 **帮我批准** 可切换查看审批历史（History）与审查设置（Settings）；不要再手动重复插入同一个插件实例。

## 可视化设置（v0.4.0+）

会话顶部 **帮我批准 → Settings** 提供表单，手动调整后 Save 即写入 `~/.dsh/llm-approve-for-me.settings.json`，下一次审查立即生效（无需重启）：

| 设置项 | 默认 | 范围 | 说明 |
| --- | --- | --- | --- |
| Reviewer provider | 空（继承主会话） | 任意 provider 名 | 留空继承提出请求的会话 |
| Reviewer model | 空（继承主会话） | 任意 model 名 | 推荐指向快速非推理模型，秒级出结论 |
| Timeout | 300 秒 | 1–600 秒 | 推理模型的思考时间计入超时 |
| Max tokens | 16384 | 256–65536 | 含推理过程；推理模型建议保持默认或更高 |

审查请求固定为无工具、无会话的最小上下文，只包含内置 persona 与本次 `REQUEST_JSON`；不会注入 AGENTS.md/CLAUDE.md。

设置合并顺序：`~/.dsh/llm-approve-for-me.settings.json` > profile `cordis.patch.yml` 的 `reviewer` 段 > 上表默认值。

也可以继续在 profile 的 `cordis.patch.yml` 中静态配置（会被设置文件覆盖）：

```yaml
- insert:
    - id: llm-approve-for-me
      name: dsh-llm-approve-for-me
      config:
        reviewer:
          provider: your-review-provider
          model: your-review-model
          timeoutMs: 300000
          maxTokens: 16384
```

## 审核协议

插件通过 DSH `llm` 服务向内置专用审查角色发起无工具、无会话的单次请求，并要求其严格按下面的 JSON 结构返回：

```json
{"decision":"allow","rationale":"原因（可选）"}
```

`decision` 只能是 `allow`、`deny` 或 `ask`；`rationale` 固定要求审查模型用**简体中文**输出一句话理由。任何额外字段、未知值、Markdown code fence 或其他非严格 JSON 响应都会回落到原生人工审批。审核超时（默认 300 秒）、取消、模型调用异常或输出无效时，具体的失败原因（同样为中文）会写入该条审批记录的 AI 说明，方便区分"审不了"和"没审完"。

## 本地验证与打包

```sh
npm test
npm run check
npm pack
```

测试不读取真实凭据、不请求真实模型。真实 DSH profile 中的加载、权限下拉框和端到端审查调用需要作为独立集成验收执行。

## License

MIT，见 [LICENSE](LICENSE)。
