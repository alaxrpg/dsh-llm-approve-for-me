window.__ModuleLoader__.load({
  id: 'dsh-llm-approve-for-me/client',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const React = require('react')
    const LABEL = 'AI Approval'
    const LEGACY_LABEL = 'LLM 替我审批'
    const LEGACY_DESCRIPTION = '由审查模型自动决定每次权限升级；仍受沙箱限制，无法裁决时询问你。'
    const DESCRIPTION = 'Let an AI reviewer decide each permission escalation; ask you when it cannot decide.'
    const RECORDS_ROUTE = '/llm-approve-for-me/records'
    const ICON_CLASS = 'dsh-llm-approval-icon'
    const STYLE_ID = 'dsh-llm-approval-style'

    function terminalIcon(size = 16) {
      return React.createElement('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true' },
        React.createElement('path', { d: 'M5.02 1.56 10.4 1.4a2 2 0 0 1 1.78.94l2.24 3.72a2 2 0 0 1 .08 1.91l-2.04 4.05a2 2 0 0 1-1.61 1.09l-4.55.38a2 2 0 0 1-1.78-.82L1.83 9.02a2 2 0 0 1-.22-1.98l1.63-4.2a2 2 0 0 1 1.78-1.28Z', stroke: 'currentColor', strokeWidth: 1.25, strokeLinejoin: 'round' }),
        React.createElement('path', { d: 'm4.85 5.5 1.75 1.7-1.75 1.7M8.15 9.05h2.55', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round' }))
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
        .dsh-ai-approval-panel{z-index:110;box-sizing:border-box;position:absolute;top:calc(100% + 6px);left:0;width:420px;max-width:min(420px,calc(100vw - 32px));max-height:min(520px,calc(100vh - 140px));overflow:auto;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-specific-menu);box-shadow:var(--dsw-shadow-lv3);padding:12px}.dsh-ai-approval-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;color:var(--dsw-alias-label-primary);font-size:13px;font-weight:600}.dsh-ai-approval-subtitle{color:var(--dsw-alias-label-tertiary);font-size:11px;font-weight:400}.dsh-ai-approval-empty{color:var(--dsw-alias-label-tertiary);padding:20px 8px;text-align:center;font-size:12px}
        .dsh-ai-approval-list{display:flex;flex-direction:column;gap:8px;margin:0;padding:0;list-style:none}.dsh-ai-approval-row{border:1px solid var(--dsw-alias-border-l1);border-radius:9px;padding:9px;background:var(--dsw-alias-bg-base)}.dsh-ai-approval-meta{display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--dsw-alias-label-tertiary);font-size:11px}.dsh-ai-approval-result{font-weight:600;text-transform:capitalize}.dsh-ai-approval-command{margin-top:7px;color:var(--dsw-alias-label-primary);font:11px/16px var(--dsw-font-mono);white-space:pre-wrap;overflow-wrap:anywhere;max-height:80px;overflow:auto}.dsh-ai-approval-reason{margin-top:6px;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px;white-space:pre-wrap;overflow-wrap:anywhere}
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
        if (value?.includes(LEGACY_LABEL) || value?.includes(LEGACY_DESCRIPTION)) {
          element.setAttribute(attribute, value.replaceAll(LEGACY_LABEL, LABEL).replaceAll(LEGACY_DESCRIPTION, DESCRIPTION))
        }
      }
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        const node = walker.currentNode
        if (node.nodeValue?.includes(LEGACY_LABEL)) node.nodeValue = node.nodeValue.replaceAll(LEGACY_LABEL, LABEL)
        if (node.nodeValue?.includes(LEGACY_DESCRIPTION)) node.nodeValue = node.nodeValue.replaceAll(LEGACY_DESCRIPTION, DESCRIPTION)
      }
    }

    function formatTime(value) {
      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? '' : date.toLocaleString()
    }

    function ApprovalHistory({ sessionId }) {
      const [open, setOpen] = React.useState(false)
      const [state, setState] = React.useState({ loading: false, records: [], error: '' })
      const root = React.useRef(null)
      React.useEffect(() => {
        if (!open) return undefined
        const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false) }
        document.addEventListener('pointerdown', close)
        return () => document.removeEventListener('pointerdown', close)
      }, [open])
      React.useEffect(() => {
        if (!open) return undefined
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
      }, [open, sessionId])

      const content = state.loading ? React.createElement('div', { className: 'dsh-ai-approval-empty' }, 'Loading…') :
        state.error ? React.createElement('div', { className: 'dsh-ai-approval-empty' }, `Unable to load: ${state.error}`) :
          state.records.length === 0 ? React.createElement('div', { className: 'dsh-ai-approval-empty' }, 'No AI approval requests in this session.') :
            React.createElement('ol', { className: 'dsh-ai-approval-list' }, state.records.map((record) => React.createElement('li', { className: 'dsh-ai-approval-row', key: record.id },
              React.createElement('div', { className: 'dsh-ai-approval-meta' }, React.createElement('span', null, `${record.toolName} · ${record.requestedSandbox}`), React.createElement('span', { className: 'dsh-ai-approval-result' }, `${record.decision} · ${record.outcome}`)),
              React.createElement('div', { className: 'dsh-ai-approval-meta' }, React.createElement('span', null, formatTime(record.requestedAt))),
              React.createElement('div', { className: 'dsh-ai-approval-command' }, record.command),
              React.createElement('div', { className: 'dsh-ai-approval-reason' }, `Request: ${record.justification}`),
              record.rationale && React.createElement('div', { className: 'dsh-ai-approval-reason' }, `AI: ${record.rationale}`))))

      return React.createElement('div', { className: 'dsh-ai-approval', ref: root },
        React.createElement('button', { type: 'button', className: 'dsh-ai-approval-trigger', 'aria-label': 'AI Approval history', 'aria-expanded': open, onClick: () => setOpen((value) => !value) }, terminalIcon(14), React.createElement('span', null, LABEL)),
        open && React.createElement('section', { className: 'dsh-ai-approval-panel', 'aria-label': 'Current session approval history' },
          React.createElement('div', { className: 'dsh-ai-approval-heading' }, React.createElement('span', null, 'AI Approval History'), React.createElement('span', { className: 'dsh-ai-approval-subtitle' }, `${state.records.length} record${state.records.length === 1 ? '' : 's'}`)), content))
    }

    const inject = ['slots']
    function apply(ctx) {
      ensureStyle()
      ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'llm-approve-for-me-history', order: 30, label: 'AI Approval' }, ApprovalHistory))
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
