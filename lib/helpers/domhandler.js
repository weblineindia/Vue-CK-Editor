/** *************************************************************************

This File will be used for Date range picker helpers

************************************************************************* **/
export default class DomHandler {
  static innerWidth(el) {
    let width = el.offsetWidth
    const style = getComputedStyle(el)

    width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    return width
  }

  static width(el) {
    let width = el.offsetWidth
    const style = getComputedStyle(el)

    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    return width
  }

  static getWindowScrollTop() {
    const doc = document.documentElement
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
  }

  static getWindowScrollLeft() {
    const doc = document.documentElement
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
  }

  static getOuterWidth(el, margin) {
    if (el) {
      let width = el.offsetWidth

      if (margin) {
        const style = getComputedStyle(el)
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight)
      }

      return width
    } else {
      return 0
    }
  }

  static getOuterHeight(el, margin) {
    if (el) {
      let height = el.offsetHeight

      if (margin) {
        const style = getComputedStyle(el)
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom)
      }

      return height
    } else {
      return 0
    }
  }

  static getClientHeight(el, margin) {
    if (el) {
      let height = el.clientHeight

      if (margin) {
        const style = getComputedStyle(el)
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom)
      }

      return height
    } else {
      return 0
    }
  }

  static getViewport() {
    const win = window
    const d = document
    const e = d.documentElement
    const g = d.getElementsByTagName('body')[0]
    const w = win.innerWidth || e.clientWidth || g.clientWidth
    const h = win.innerHeight || e.clientHeight || g.clientHeight

    return { width: w, height: h }
  }

  static getOffset(el) {
    var rect = el.getBoundingClientRect()

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    }
  }

  static generateZIndex() {
    this.zindex = this.zindex || 999
    return ++this.zindex
  }

  static getCurrentZIndex() {
    return this.zindex
  }

  static index(element) {
    const children = element.parentNode.childNodes
    let num = 0
    for (var i = 0; i < children.length; i++) {
      if (children[i] === element) return num
      if (children[i].nodeType === 1) num++
    }
    return -1
  }

  static addMultipleClasses(element, className) {
    if (element.classList) {
      const styles = className.split(' ')
      for (let i = 0; i < styles.length; i++) {
        element.classList.add(styles[i])
      }
    } else {
      const styles = className.split(' ')
      for (let i = 0; i < styles.length; i++) {
        element.className += ' ' + styles[i]
      }
    }
  }

  static addClass(element, className) {
    if (element.classList) element.classList.add(className)
    else element.className += ' ' + className
  }

  static removeClass(element, className) {
    if (element.classList) element.classList.remove(className)
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      )
  }

  static hasClass(element, className) {
    if (element.classList) return element.classList.contains(className)
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(
        element.className
      )
  }

  static find(element, selector) {
    return element.querySelectorAll(selector)
  }

  static findSingle(element, selector) {
    if (selector && element) {
      return element.querySelector(selector)
    }
  }

  static getHeight(el) {
    let height = el.offsetHeight
    const style = getComputedStyle(el)

    height -=
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth)

    return height
  }

  static getWidth(el) {
    let width = el.offsetWidth
    const style = getComputedStyle(el)

    width -=
      parseFloat(style.paddingLeft) +
      parseFloat(style.paddingRight) +
      parseFloat(style.borderLeftWidth) +
      parseFloat(style.borderRightWidth)

    return width
  }

  static absolutePosition(element, target) {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element)
    const elementOuterHeight = elementDimensions.height
    const elementOuterWidth = elementDimensions.width
    const targetOuterHeight = target.offsetHeight
    const targetOuterWidth = target.offsetWidth
    const targetOffset = target.getBoundingClientRect()
    const windowScrollTop = this.getWindowScrollTop()
    const windowScrollLeft = this.getWindowScrollLeft()
    const viewport = this.getViewport()
    let top, left

    if (
      targetOffset.top + targetOuterHeight + elementOuterHeight >
      viewport.height
    )
      top = targetOffset.top + windowScrollTop - elementOuterHeight
    else top = targetOuterHeight + targetOffset.top + windowScrollTop

    if (
      targetOffset.left + targetOuterWidth + elementOuterWidth >
      viewport.width
    )
      left =
        targetOffset.left +
        windowScrollLeft +
        targetOuterWidth -
        elementOuterWidth
    else left = targetOffset.left + windowScrollLeft

    element.style.top = top + 'px'
    element.style.left = left + 'px'
  }

  static relativePosition(element, target) {
    var elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element)
    var targetHeight = target.offsetHeight
    var targetWidth = target.offsetWidth
    var targetOffset = target.getBoundingClientRect()
    var viewport = this.getViewport()
    var top, left

    if (
      targetOffset.top + targetHeight + elementDimensions.height >
      viewport.height
    )
      top = -1 * elementDimensions.height
    else top = targetHeight

    if (targetOffset.left + elementDimensions.width > viewport.width)
      left = targetWidth - elementDimensions.width
    else left = 0

    element.style.top = top + 'px'
    element.style.left = left + 'px'
  }

  static getHiddenElementOuterHeight(element) {
    element.style.visibility = 'hidden'
    element.style.display = 'block'
    const elementHeight = element.offsetHeight
    element.style.display = 'none'
    element.style.visibility = 'visible'

    return elementHeight
  }

  static getHiddenElementOuterWidth(element) {
    element.style.visibility = 'hidden'
    element.style.display = 'block'
    const elementWidth = element.offsetWidth
    element.style.display = 'none'
    element.style.visibility = 'visible'

    return elementWidth
  }

  static getHiddenElementDimensions(element) {
    var dimensions = {}
    element.style.visibility = 'hidden'
    element.style.display = 'block'
    dimensions.width = element.offsetWidth
    dimensions.height = element.offsetHeight
    element.style.display = 'none'
    element.style.visibility = 'visible'

    return dimensions
  }

  static fadeIn(element, duration) {
    element.style.opacity = 0

    var last = +new Date()
    var opacity = 0
    var tick = function() {
      opacity =
        +element.style.opacity + (new Date().getTime() - last) / duration
      element.style.opacity = opacity
      last = +new Date()

      if (+opacity < 1) {
        ;(window.requestAnimationFrame && requestAnimationFrame(tick)) ||
          setTimeout(tick, 16)
      }
    }

    tick()
  }

  static fadeOut(element, ms) {
    var opacity = 1
    var interval = 50
    var duration = ms
    var gap = interval / duration

    const fading = setInterval(() => {
      opacity -= gap

      if (opacity <= 0) {
        opacity = 0
        clearInterval(fading)
      }

      element.style.opacity = opacity
    }, interval)
  }

  static getUserAgent() {
    return navigator.userAgent
  }

  static appendChild(element, target) {
    if (this.isElement(target)) target.appendChild(element)
    else if (target.el && target.el.nativeElement)
      target.el.nativeElement.appendChild(element)
    else throw new Error('Cannot append ' + target + ' to ' + element)
  }

  static scrollInView(container, item) {
    const borderTopValue = getComputedStyle(container).getPropertyValue(
      'borderTopWidth'
    )
    const borderTop = borderTopValue ? parseFloat(borderTopValue) : 0
    const paddingTopValue = getComputedStyle(container).getPropertyValue(
      'paddingTop'
    )
    const paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0
    const containerRect = container.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const offset =
      itemRect.top +
      document.body.scrollTop -
      (containerRect.top + document.body.scrollTop) -
      borderTop -
      paddingTop
    const scroll = container.scrollTop
    const elementHeight = container.clientHeight
    const itemHeight = this.getOuterHeight(item)

    if (offset < 0) {
      container.scrollTop = scroll + offset
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight
    }
  }

  static clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty()
      } else if (
        window.getSelection().removeAllRanges &&
        window.getSelection().rangeCount > 0 &&
        window
          .getSelection()
          .getRangeAt(0)
          .getClientRects().length > 0
      ) {
        window.getSelection().removeAllRanges()
      }
    } else if (document.selection && document.selection.empty) {
      try {
        document.selection.empty()
      } catch (error) {
        // ignore IE bug
      }
    }
  }

  static calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null)
      return this.calculatedScrollbarWidth

    const scrollDiv = document.createElement('div')
    scrollDiv.className = 'p-scrollbar-measure'
    document.body.appendChild(scrollDiv)

    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)

    this.calculatedScrollbarWidth = scrollbarWidth

    return scrollbarWidth
  }

  static getBrowser() {
    if (!this.browser) {
      const matched = this.resolveUserAgent()
      this.browser = {}

      if (matched.browser) {
        this.browser[matched.browser] = true
        this.browser.version = matched.version
      }

      if (this.browser.chrome) {
        this.browser.webkit = true
      } else if (this.browser.webkit) {
        this.browser.safari = true
      }
    }

    return this.browser
  }

  static resolveUserAgent() {
    const ua = navigator.userAgent.toLowerCase()
    const match =
      /(chrome)[ ]([\w.]+)/.exec(ua) ||
      /(webkit)[ ]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      (ua.indexOf('compatible') < 0 &&
        /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
      []

    return {
      browser: match[1] || '',
      version: match[2] || '0',
    }
  }

  static isVisible(element) {
    return element.offsetParent != null
  }

  static invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args)
  }

  static getFocusableElements(element) {
    const focusableElements = DomHandler.find(
      element,
      `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
              [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
              input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
              textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
              [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`
    )

    const visibleFocusableElements = []
    for (const focusableElement of focusableElements) {
      if (
        getComputedStyle(focusableElement).display !== 'none' &&
        getComputedStyle(focusableElement).visibility !== 'hidden'
      )
        visibleFocusableElements.push(focusableElement)
    }

    return visibleFocusableElements
  }
}
