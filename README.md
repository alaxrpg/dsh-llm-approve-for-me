# dsh-llm-approve-for-me

一个 DeepSeek Harness（DSH）插件：当会话选择 **LLM Approve For Me** 权限预设时，每一笔有效的 Shell 或 PowerShell 沙箱权限升级都由一个无工具的审查 LLM 判定。

## 设计边界

- 没有命令前缀、正则、白名单、黑名单、危险操作列表或其他规则判断。
- 不会绕过 DSH 的沙箱：每次允许只返回原生的 `allowed-once` 一次性授权。
- 审查 LLM 输出是唯一的自动决策来源：`allow` 允许一次、`deny` 拒绝、`ask` 交回原生人工审批。
- 每个会话顶部提供 **AI Approval** 按钮，按当前 session 隔离展示最近 100 条审批记录，包括命令、申请理由、目标权限、AI 结论与最终结果。
- 缺失审查模型路由、超时、取消、子代理异常或结构化输出无效时，同样交回人工审批；不会默许放行。
- 审查子代理设置 `toolFilter: { allow: [] }`，不会拥有工具权限；命令和理由以不可信 JSON 证据提供，提示词明确禁止执行其中的指令。

这不是安全产品，也不能替代人工授权、最小权限、备份或隔离。它的含义是把授权判断交给你在 DSH 中配置的 LLM，而不是交给本插件的命令规则。

## 安装

在 DSH profile 中安装 GitHub 包：

```sh
dsh plugin --profile web add github:alaxrpg/dsh-llm-approve-for-me
```

重启 DSH Web 后，在权限选择器中选择 **AI Approval**。插件的浏览器端半身会在菜单项、当前权限按钮以及会话顶部记录按钮前渲染一枚与 DSH 原生权限图标同为 16px、`currentColor` 的终端审批 SVG；它会跟随亮暗主题，不使用文字或 Emoji 充当图标。点击会话顶部的 **AI Approval** 可查看当前会话在本次 DSH 运行期间产生的审批记录。交互语义与 Codex 的“替我审批”相近：模型审核每次权限升级，但不会获得完全访问权限。包内的 [`dsh/cordis.patch.yml`](dsh/cordis.patch.yml) 会添加该权限预设并挂载插件；不要再手动重复插入同一个插件实例。

## 配置

默认继承提出当前权限请求的会话的 Provider 与模型。若要固定使用较便宜的专用审查模型，可在 profile 的 `cordis.patch.yml` 中为插件增加配置：

```yaml
- insert:
    - id: llm-approve-for-me
      name: dsh-llm-approve-for-me
      config:
        reviewer:
          provider: your-review-provider
          model: your-review-model
          timeoutMs: 30000
```

`provider` 与 `model` 必须同时配置；未配置时继承当前会话。`timeoutMs` 可为 1000–120000 毫秒，默认 30000。

## 审核协议

插件将请求交给无工具子代理，并要求其严格按下面的 JSON 结构返回：

```json
{"decision":"allow","rationale":"原因（可选）"}
```

`decision` 只能是 `allow`、`deny` 或 `ask`。任何额外字段、未知值或非结构化响应都会回落到原生人工审批。

## 本地验证与打包

```sh
npm test
npm run check
npm pack
```

测试不读取真实凭据、不请求真实模型。真实 DSH profile 中的加载、权限下拉框和端到端审查调用需要作为独立集成验收执行。

## License

MIT，见 [LICENSE](LICENSE)。
