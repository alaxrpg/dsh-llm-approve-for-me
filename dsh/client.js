// dsh-llm-approve-for-me 浏览器端半身。
//
// DSH 0.1.1 的 PermissionSelect 只为三个内置 preset 硬编码图标，第三方
// preset schema 没有 icon 字段。因此这里在宿主完成菜单/按钮渲染后，为本
// 插件的唯一 preset 补上同尺寸、currentColor 的终端审批 SVG；不修改 DSH core。

window.__ModuleLoader__.load({
  id: 'dsh-llm-approve-for-me/client',
  factory: () => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const LABEL = 'LLM 替我审批'
    const ICON_CLASS = 'dsh-llm-approval-icon'
    const STYLE_ID = 'dsh-llm-approval-icon-style'

    function normalizedText(element) {
      return (element.textContent || '').replace(/\s+/g, ' ').trim()
    }

    function createIcon() {
      const span = document.createElement('span')
      span.className = ICON_CLASS
      span.setAttribute('aria-hidden', 'true')
      span.innerHTML = [
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M5.02 1.56 10.4 1.4a2 2 0 0 1 1.78.94l2.24 3.72a2 2 0 0 1 .08 1.91l-2.04 4.05a2 2 0 0 1-1.61 1.09l-4.55.38a2 2 0 0 1-1.78-.82L1.83 9.02a2 2 0 0 1-.22-1.98l1.63-4.2a2 2 0 0 1 1.78-1.28Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>',
        '<path d="m4.85 5.5 1.75 1.7-1.75 1.7M8.15 9.05h2.55" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>',
        '</svg>',
      ].join('')
      return span
    }

    function ensureStyle() {
      if (document.getElementById(STYLE_ID)) return
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = [
        `.${ICON_CLASS}{display:inline-flex;align-items:center;justify-content:center;flex:0 0 16px;width:16px;height:16px;color:inherit}`,
        `.${ICON_CLASS}>svg{display:block;width:16px;height:16px}`,
      ].join('')
      document.head.appendChild(style)
    }

    function decorate(element) {
      if (element.querySelector(`:scope > .${ICON_CLASS}`)) return
      element.insertBefore(createIcon(), element.firstChild)
    }

    function decoratePermissionControls() {
      for (const item of document.querySelectorAll('[role="menuitem"]')) {
        if (normalizedText(item) === LABEL) decorate(item)
      }
      for (const button of document.querySelectorAll('button[aria-label]')) {
        const label = button.getAttribute('aria-label') || ''
        if (label.includes(LABEL)) decorate(button)
      }
    }

    const inject = []

    function apply(ctx) {
      ensureStyle()
      let scheduled = false
      const refresh = () => {
        if (scheduled) return
        scheduled = true
        queueMicrotask(() => {
          scheduled = false
          decoratePermissionControls()
        })
      }
      const observer = new MutationObserver(refresh)
      observer.observe(document.documentElement, { childList: true, subtree: true })
      refresh()

      const dispose = () => {
        observer.disconnect()
        document.querySelectorAll(`.${ICON_CLASS}`).forEach((icon) => icon.remove())
        document.getElementById(STYLE_ID)?.remove()
      }
      if (typeof ctx.effect === 'function') ctx.effect(() => dispose, 'llm-approve-for-me permission icon')
      return dispose
    }

    exports.apply = apply
    exports.inject = inject
    return module.exports
  },
})
