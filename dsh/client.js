window.__ModuleLoader__.load({
  id: 'dsh-llm-approve-for-me/client',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const React = require('react')
    const LABEL = '帮我批准'
    const LEGACY_LABEL = 'LLM 替我审批'
    const LEGACY_DESCRIPTION = '由审查模型自动决定每次权限升级；仍受沙箱限制，无法裁决时询问你。'
    const PREVIOUS_LABEL = 'AI Approval'
    const PREVIOUS_DESCRIPTION = 'Let an AI reviewer decide each permission escalation; ask you when it cannot decide.'
    const DESCRIPTION = '让 AI 审查员决定每次权限升级；无法裁决时询问你。'
    const RECORDS_ROUTE = '/llm-approve-for-me/records'
    const SETTINGS_ROUTE = '/llm-approve-for-me/settings'
    const ICON_CLASS = 'dsh-llm-approval-icon'
    const STYLE_ID = 'dsh-llm-approval-style'

    function terminalIcon(size = 16) {
      return React.createElement('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' },
        React.createElement('path', { d: 'M5.02 1.56 10.4 1.4a2 2 0 0 1 1.78.94l2.24 3.72a2 2 0 0 1 .08 1.91l-2.04 4.05a2 2 0 0 1-1.61 1.09l-4.55.38a2 2 0 0 1-1.78-.82L1.83 9.02a2 2 0 0 1-.22-1.98l1.63-4.2a2 2 0 0 1 1.78-1.28Z', stroke: 'currentColor', strokeWidth: 1.25, strokeLinejoin: 'round' }),
        React.createElement('path', { d: 'm4.85 5.5 1.75 1.7-1.75 1.7M8.15 9.05h2.55', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round' }))
    }

    function gearIcon(size = 14) {
      return React.createElement('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' },
        React.createElement('path', { d: 'M6.06 2.16a6.1 6.1 0 0 1 3.88 0l.52 1.62a1 1 0 0 0 1.25.64l1.6-.52a6.1 6.1 0 0 1 1.94 3.36l-1.28 1.08a1 1 0 0 0 0 1.52l1.28 1.08a6.1 6.1 0 0 1-1.94 3.36l-1.6-.52a1 1 0 0 0-1.25.64l-.52 1.62a6.1 6.1 0 0 1-3.88 0l-.52-1.62a1 1 0 0 0-1.25-.64l-1.6.52a6.1 6.1 0 0 1-1.94-3.36l1.28-1.08a1 1 0 0 0 0-1.52L.75 7.26a6.1 6.1 0 0 1 1.94-3.36l1.6.52a1 1 0 0 0 1.25-.64l.52-1.62Z', stroke: 'currentColor', strokeWidth: 1.25, strokeLinejoin: 'round' }),
        React.createElement('circle', { cx: '8', cy: '8', r: '2.1', stroke: 'currentColor', strokeWidth: 1.25 }))
    }

    function normalizedText(element) {
      return (element.textContent || '').replace(/\s+/g, ' ').trim()
    }

    function createPermissionIcon() {
      const span = document.createElement('span')
      span.className = ICON_CLASS
      span.setAttribute('aria-hidden', 'true')
      span.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.02 1.56 10.4 1.4a2 2 0 0 1 1.78.94l2.24 3.72a2 2 0 0 1 .08 1.91l-2.04 4.05a2 2 0 0 1-1.61 1.09l-4.55.38a2 2 0 0 1-1.78-.82L1.83 9.02a2 2 0 0 1-.22-1.98l1.63-4.2a2 2 0 0 1 1.78-1.28Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="m4.85 5.5 1.75 1.7-1.75 1.7M8.15 9.05h2.55" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      return span
    }

    function ensureStyle() {
      if (document.getElementById(STYLE_ID)) return
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = `
        .${ICON_CLASS}{display:inline-flex;align-items:center;justify-content:center;flex:0 0 16px;width:16px;height:16px;color:inherit}.${ICON_CLASS}>svg{display:block;width:16px;height:16px}
        .dsh-ai-approval{position:relative}.dsh-ai-approval-trigger{min-height:28px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:transparent;border:0;border-radius:6px;display:inline-flex;align-items:center;gap:6px;padding:3px 7px;font-size:12px;line-height:18px}.dsh-ai-approval-trigger:hover,.dsh-ai-approval-trigger:focus-visible{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover)}
        .dsh-ai-approval-panel{z-index:110;box-sizing:border-box;position:absolute;top:calc(100% + 6px);left:0;width:460px;max-width:min(460px,calc(100vw - 32px));max-height:min(560px,calc(100vh - 140px));overflow:auto;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-specific-menu);box-shadow:var(--dsw-shadow-lv3);padding:14px}.dsh-ai-approval-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);font-size:13px;font-weight:600}.dsh-ai-approval-subtitle{color:var(--dsw-alias-label-tertiary);font-size:11px;font-weight:400}
        .dsh-ai-approval-tab{display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:transparent;border:0;border-radius:6px;padding:4px 8px;font-size:12px;font-weight:500}.dsh-ai-approval-tab:hover{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover)}.dsh-ai-approval-tab-active{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
        .dsh-ai-approval-empty{color:var(--dsw-alias-label-tertiary);padding:28px 8px;text-align:center;font-size:12px}.dsh-ai-approval-empty-icon{display:flex;justify-content:center;opacity:.4;margin-bottom:6px}
        .dsh-ai-approval-history{display:flex;flex-direction:column;gap:8px}.dsh-ai-approval-count{color:var(--dsw-alias-label-tertiary);font-size:10.5px;text-align:right}
        .dsh-ai-approval-list{display:flex;flex-direction:column;gap:10px;margin:0;padding:0;list-style:none}
        .dsh-ai-approval-row{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:10px 11px;background:var(--dsw-alias-bg-base);transition:border-color .12s ease,box-shadow .12s ease}.dsh-ai-approval-row:hover{border-color:var(--dsw-alias-border-l2);box-shadow:0 1px 4px rgb(0 0 0 / .05)}
        .dsh-ai-approval-rowhead{display:flex;align-items:center;gap:7px;margin-bottom:8px}.dsh-ai-approval-time{margin-left:auto;color:var(--dsw-alias-label-tertiary);font-size:10.5px;white-space:nowrap;font-variant-numeric:tabular-nums}
        .dsh-ai-approval-badge{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 9px;font-size:11px;font-weight:600;line-height:16px}
        .dsh-ai-approval-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.9}
        .dsh-ai-approval-badge-allow{color:#1e7e45;background:rgb(30 126 69 / .12)}.dsh-ai-approval-badge-deny{color:#c0392b;background:rgb(192 57 43 / .12)}.dsh-ai-approval-badge-ask{color:#a26800;background:rgb(162 104 0 / .14)}.dsh-ai-approval-badge-reviewing{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover)}
        .dsh-ai-approval-outcome{color:var(--dsw-alias-label-secondary);font-size:11px}
        .dsh-ai-approval-command{box-sizing:border-box;color:var(--dsw-alias-label-secondary);font:11px/16px var(--dsw-font-mono,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);white-space:pre-wrap;overflow-wrap:anywhere;max-height:84px;overflow:auto;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:7px;padding:6px 8px}
        .dsh-ai-approval-command-hint{display:inline-flex;align-items:center;gap:4px;color:var(--dsw-alias-label-tertiary);font-size:10.5px;margin-bottom:4px}
        .dsh-ai-approval-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.dsh-ai-approval-tag{display:inline-flex;align-items:center;border-radius:5px;padding:1px 7px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);font-size:10.5px;line-height:17px}.dsh-ai-approval-tag-model{font-family:var(--dsw-font-mono,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace)}
        .dsh-ai-approval-reason{display:flex;gap:8px;margin-top:8px;padding-left:8px;border-left:2px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;white-space:pre-wrap;overflow-wrap:anywhere}.dsh-ai-approval-kv{flex:0 0 auto;color:var(--dsw-alias-label-tertiary);font-weight:600}.dsh-ai-approval-toggle{border:0;background:transparent;color:var(--dsw-alias-label-secondary);font-size:10.5px;padding:0 2px;cursor:pointer;text-decoration:underline}.dsh-ai-approval-note{color:var(--dsw-alias-label-tertiary)}
        .dsh-ai-approval-ai{margin-top:6px;color:var(--dsw-alias-label-secondary)}
        .dsh-ai-approval-form{display:flex;flex-direction:column;gap:10px}.dsh-ai-approval-field{display:flex;flex-direction:column;gap:4px}.dsh-ai-approval-label{color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:500}.dsh-ai-approval-input{box-sizing:border-box;width:100%;border:1px solid var(--dsw-alias-border-l2);border-radius:7px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:12px;padding:5px 8px;outline:none}.dsh-ai-approval-input:focus{border-color:var(--dsw-alias-border-l3)}.dsh-ai-approval-check{display:flex;align-items:center;gap:7px;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px;cursor:pointer}.dsh-ai-approval-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.dsh-ai-approval-save{border:0;border-radius:7px;background:var(--dsw-alias-interactive-accent,var(--dsw-alias-label-primary));color:var(--dsw-specific-menu,#fff);font-size:12px;font-weight:500;padding:5px 14px;cursor:pointer}.dsh-ai-approval-save:disabled{opacity:.55;cursor:default}.dsh-ai-approval-hint{color:var(--dsh-approval-hint,var(--dsw-alias-label-tertiary));font-size:11px;overflow-wrap:anywhere}.dsh-ai-approval-error{color:var(--dsw-alias-danger,#c0392b);font-size:11px}.dsh-ai-approval-saved{color:var(--dsw-alias-success,#2e7d32);font-size:11px}
      `
      document.head.appendChild(style)
    }

    function decoratePermissionControls() {
      for (const item of document.querySelectorAll('[role="menuitem"]')) {
        replaceLegacyCopy(item)
        if (normalizedText(item) === LABEL && !item.querySelector(`:scope > .${ICON_CLASS}`)) item.insertBefore(createPermissionIcon(), item.firstChild)
      }
      for (const button of document.querySelectorAll('button[aria-label]')) {
        replaceLegacyCopy(button)
        if (!button.classList.contains('dsh-ai-approval-trigger') && (button.getAttribute('aria-label') || '').includes(LABEL) && !button.querySelector(`:scope > .${ICON_CLASS}`)) button.insertBefore(createPermissionIcon(), button.firstChild)
      }
    }

    function replaceLegacyCopy(element) {
      for (const attribute of ['aria-label', 'aria-description', 'title']) {
        const value = element.getAttribute(attribute)
        if (value?.includes(LEGACY_LABEL) || value?.includes(LEGACY_DESCRIPTION) || value?.includes(PREVIOUS_LABEL) || value?.includes(PREVIOUS_DESCRIPTION)) {
          element.setAttribute(attribute, value.replaceAll(LEGACY_LABEL, LABEL).replaceAll(LEGACY_DESCRIPTION, DESCRIPTION).replaceAll(PREVIOUS_LABEL, LABEL).replaceAll(PREVIOUS_DESCRIPTION, DESCRIPTION))
        }
      }
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        const node = walker.currentNode
        if (node.nodeValue?.includes(LEGACY_LABEL)) node.nodeValue = node.nodeValue.replaceAll(LEGACY_LABEL, LABEL)
        if (node.nodeValue?.includes(LEGACY_DESCRIPTION)) node.nodeValue = node.nodeValue.replaceAll(LEGACY_DESCRIPTION, DESCRIPTION)
        if (node.nodeValue?.includes(PREVIOUS_LABEL)) node.nodeValue = node.nodeValue.replaceAll(PREVIOUS_LABEL, LABEL)
        if (node.nodeValue?.includes(PREVIOUS_DESCRIPTION)) node.nodeValue = node.nodeValue.replaceAll(PREVIOUS_DESCRIPTION, DESCRIPTION)
      }
    }

    function formatTime(value) {
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return ''
      const pad = (n) => String(n).padStart(2, '0')
      return `${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
    }

    // AI 结论行左侧的强调色：与徽章同色系，弱化的引用竖线。
    const AI_ACCENTS = { allow: '#1e7e45', deny: '#c0392b', ask: '#a26800' }
    // 审查失败（非真正决策）时整行使用弱化样式：按内置失败文案前缀识别（中文，兼容历史英文记录）。
    function isReviewerFailure(record) {
      if (record.decision !== 'ask' || !record.rationale) return false
      return /^(AI 审查(超时|已|失败|在|尝试|未)|缺少审查模型路由|The AI reviewer)/.test(record.rationale)
    }

    function ApprovalSettings() {
      const [state, setState] = React.useState({ loading: true, saving: false, saved: false, error: '', form: null, ranges: null, settingsFile: '' })
      React.useEffect(() => {
        const controller = new AbortController()
        fetch(SETTINGS_ROUTE, { signal: controller.signal, headers: { accept: 'application/json' } })
          .then(async (response) => {
            const body = await response.json()
            if (!response.ok) throw new Error(body.error || `HTTP ${response.status}`)
            setState({ loading: false, saving: false, saved: false, error: '', form: { ...body.settings, timeoutSeconds: Math.round(body.settings.timeoutMs / 1000) }, ranges: body.ranges, settingsFile: body.settingsFile })
          })
          .catch((error) => { if (error.name !== 'AbortError') setState((current) => ({ ...current, loading: false, error: String(error.message || error) })) })
        return () => controller.abort()
      }, [])
      const update = (key) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState((current) => ({ ...current, saved: false, form: { ...current.form, [key]: value } }))
      }
      const save = () => {
        setState((current) => ({ ...current, saving: true, saved: false, error: '' }))
        const form = state.form
        fetch(SETTINGS_ROUTE, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
          provider: form.provider, model: form.model,
          timeoutMs: Math.round(Number(form.timeoutSeconds) * 1000),
          maxTokens: Math.round(Number(form.maxTokens)),
        }) })
          .then(async (response) => {
            const body = await response.json()
            if (!response.ok) throw new Error(body.error || `HTTP ${response.status}`)
            setState((current) => ({ ...current, saving: false, saved: true, form: { ...body.settings, timeoutSeconds: Math.round(body.settings.timeoutMs / 1000) } }))
          })
          .catch((error) => setState((current) => ({ ...current, saving: false, error: String(error.message || error) })))
      }
      if (state.loading) return React.createElement('div', { className: 'dsh-ai-approval-empty' }, '加载中…')
      if (!state.form) return React.createElement('div', { className: 'dsh-ai-approval-empty' }, `无法加载：${state.error}`)
      const form = state.form
      const timeoutBounds = state.ranges ? [Math.ceil(state.ranges.timeoutMs[0] / 1000), Math.floor(state.ranges.timeoutMs[1] / 1000)] : [1, 600]
      const tokenBounds = state.ranges?.maxTokens ?? [256, 65536]
      return React.createElement('div', { className: 'dsh-ai-approval-form' },
        React.createElement('div', { className: 'dsh-ai-approval-field' },
          React.createElement('label', { className: 'dsh-ai-approval-label' }, '审查模型 Provider（留空 = 跟随主会话）'),
          React.createElement('input', { className: 'dsh-ai-approval-input', value: form.provider || '', placeholder: '跟随主会话', onChange: update('provider') })),
        React.createElement('div', { className: 'dsh-ai-approval-field' },
          React.createElement('label', { className: 'dsh-ai-approval-label' }, '审查模型（留空 = 跟随主会话，推荐快速非推理模型）'),
          React.createElement('input', { className: 'dsh-ai-approval-input', value: form.model || '', placeholder: '跟随主会话', onChange: update('model') })),
        React.createElement('div', { className: 'dsh-ai-approval-field' },
          React.createElement('label', { className: 'dsh-ai-approval-label' }, `审查超时（秒，${timeoutBounds[0]}\u2013${timeoutBounds[1]}，推理模型思考计入超时）`),
          React.createElement('input', { className: 'dsh-ai-approval-input', type: 'number', min: timeoutBounds[0], max: timeoutBounds[1], value: form.timeoutSeconds, onChange: update('timeoutSeconds') })),
        React.createElement('div', { className: 'dsh-ai-approval-field' },
          React.createElement('label', { className: 'dsh-ai-approval-label' }, `输出预算（tokens，${tokenBounds[0]}\u2013${tokenBounds[1]}，含推理过程）`),
          React.createElement('input', { className: 'dsh-ai-approval-input', type: 'number', min: tokenBounds[0], max: tokenBounds[1], value: form.maxTokens, onChange: update('maxTokens') })),
        React.createElement('div', { className: 'dsh-ai-approval-hint' }, '审查使用无工具、无会话的独立 LLM 请求；不会创建子代理，也不注入 AGENTS.md/CLAUDE.md。'),
        React.createElement('div', { className: 'dsh-ai-approval-actions' },
          React.createElement('button', { type: 'button', className: 'dsh-ai-approval-save', disabled: state.saving, onClick: save }, state.saving ? '保存中…' : '保存'),
          state.saved && React.createElement('span', { className: 'dsh-ai-approval-saved' }, '已保存 \u2014 下次审查生效'),
          state.error && React.createElement('span', { className: 'dsh-ai-approval-error' }, state.error)),
        React.createElement('div', { className: 'dsh-ai-approval-hint' }, `设置文件：${state.settingsFile}`))
    }

    const VERDICT_LABELS = { allow: 'AI 通过', deny: 'AI 拒绝', ask: '询问用户', reviewing: '审查中' }
    const OUTCOME_LABELS = { 'allowed-once': '已放行一次', rejected: '已拒绝', 'asked-user': '等待/已由用户决定', pending: '进行中' }

    function verdictBadge(record) {
      const decision = record.decision
      const known = decision === 'allow' || decision === 'deny' || decision === 'ask' || decision === 'reviewing'
      return React.createElement('span', { className: `dsh-ai-approval-badge dsh-ai-approval-badge-${known ? decision : 'ask'}` },
        VERDICT_LABELS[decision] ?? decision)
    }

    function ApprovalRecordRow({ record }) {
      const [expanded, setExpanded] = React.useState(false)
      const longReason = record.justification.length > 90
      const reasonText = expanded || !longReason ? record.justification : `${record.justification.slice(0, 90)}…`
      const accent = AI_ACCENTS[record.decision] || undefined
      return React.createElement('li', { className: 'dsh-ai-approval-row' },
        React.createElement('div', { className: 'dsh-ai-approval-rowhead' },
          verdictBadge(record),
          React.createElement('span', { className: 'dsh-ai-approval-outcome' }, OUTCOME_LABELS[record.outcome] ?? record.outcome),
          React.createElement('span', { className: 'dsh-ai-approval-time', title: String(record.requestedAt) }, formatTime(record.requestedAt))),
        React.createElement('div', { className: 'dsh-ai-approval-command-hint' }, `请求目标 · ${record.requestedSandbox}`),
        React.createElement('div', { className: 'dsh-ai-approval-command' }, record.command),
        React.createElement('div', { className: 'dsh-ai-approval-tags' },
          React.createElement('span', { className: 'dsh-ai-approval-tag' }, record.toolName),
          React.createElement('span', { className: 'dsh-ai-approval-tag' }, record.requestedSandbox),
          record.reviewer && React.createElement('span', { className: 'dsh-ai-approval-tag dsh-ai-approval-tag-model' }, record.reviewer)),
        React.createElement('div', { className: 'dsh-ai-approval-reason' },
          React.createElement('span', { className: 'dsh-ai-approval-kv' }, '理由'),
          React.createElement('span', null, reasonText),
          longReason && React.createElement('button', { type: 'button', className: 'dsh-ai-approval-toggle', onClick: () => setExpanded((value) => !value) }, expanded ? '收起' : '展开')),
        record.rationale && React.createElement('div', { className: `dsh-ai-approval-reason dsh-ai-approval-ai${isReviewerFailure(record) ? ' dsh-ai-approval-note' : ''}`, style: accent ? { borderLeftColor: accent } : undefined },
          React.createElement('span', { className: 'dsh-ai-approval-kv' }, 'AI'),
          React.createElement('span', null, record.rationale)))
    }

    function ApprovalHistory({ sessionId }) {
      const [state, setState] = React.useState({ loading: false, records: [], error: '' })
      React.useEffect(() => {
        const controller = new AbortController()
        setState((current) => ({ ...current, loading: true, error: '' }))
        fetch(`${RECORDS_ROUTE}?sessionId=${encodeURIComponent(sessionId)}`, { signal: controller.signal, headers: { accept: 'application/json' } })
          .then(async (response) => {
            const body = await response.json()
            if (!response.ok) throw new Error(body.error || `HTTP ${response.status}`)
            setState({ loading: false, records: Array.isArray(body.records) ? body.records : [], error: '' })
          })
          .catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, records: [], error: String(error.message || error) }) })
        return () => controller.abort()
      }, [sessionId])

      return state.loading ? React.createElement('div', { className: 'dsh-ai-approval-empty' }, '加载中…') :
        state.error ? React.createElement('div', { className: 'dsh-ai-approval-empty' }, `加载失败：${state.error}`) :
          state.records.length === 0 ? React.createElement('div', { className: 'dsh-ai-approval-empty' },
            React.createElement('div', { className: 'dsh-ai-approval-empty-icon', 'aria-hidden': 'true' }, terminalIcon(18)),
            React.createElement('div', null, '本会话暂无 AI 审批记录。')) :
            React.createElement('div', { className: 'dsh-ai-approval-history' },
              React.createElement('div', { className: 'dsh-ai-approval-count' }, React.createElement('span', null, `共 ${state.records.length} 条记录`)),
              React.createElement('ol', { className: 'dsh-ai-approval-list' }, state.records.map((record) => React.createElement(ApprovalRecordRow, { record, key: record.id }))))
    }

    function ApprovalPanel({ sessionId }) {
      const [open, setOpen] = React.useState(false)
      const [view, setView] = React.useState('history')
      const root = React.useRef(null)
      React.useEffect(() => {
        if (!open) return undefined
        const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false) }
        document.addEventListener('pointerdown', close)
        return () => document.removeEventListener('pointerdown', close)
      }, [open])

      return React.createElement('div', { className: 'dsh-ai-approval', ref: root },
        React.createElement('button', { type: 'button', className: 'dsh-ai-approval-trigger', 'aria-label': `${LABEL}审批记录`, 'aria-expanded': open, onClick: () => setOpen((value) => !value) }, terminalIcon(14), React.createElement('span', null, LABEL)),
        open && React.createElement('section', { className: 'dsh-ai-approval-panel', 'aria-label': '当前会话审批记录' },
          React.createElement('div', { className: 'dsh-ai-approval-heading' },
            React.createElement('span', { className: `dsh-ai-approval-tab${view === 'history' ? ' dsh-ai-approval-tab-active' : ''}`, role: 'button', tabIndex: 0, onClick: () => setView('history') }, '审批记录'),
            React.createElement('span', { className: `dsh-ai-approval-tab${view === 'settings' ? ' dsh-ai-approval-tab-active' : ''}`, role: 'button', tabIndex: 0, onClick: () => setView('settings') }, gearIcon(13), ' 审查设置')),
          view === 'settings' ? React.createElement(ApprovalSettings, null) : React.createElement(ApprovalHistory, { sessionId })))
    }

    const inject = ['slots']
    function apply(ctx) {
      ensureStyle()
      ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'llm-approve-for-me-history', order: 30, label: LABEL }, ApprovalPanel))
      let scheduled = false
      const refresh = () => {
        if (scheduled) return
        scheduled = true
        queueMicrotask(() => { scheduled = false; decoratePermissionControls() })
      }
      const observer = new MutationObserver(refresh)
      observer.observe(document.documentElement, { childList: true, subtree: true })
      refresh()
      ctx.effect(() => () => {
        observer.disconnect()
        document.querySelectorAll(`.${ICON_CLASS}`).forEach((icon) => icon.remove())
        document.getElementById(STYLE_ID)?.remove()
      }, 'llm-approve-for-me client lifecycle')
    }
    exports.apply = apply
    exports.inject = inject
    return module.exports
  },
})
