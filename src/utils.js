/**
 * is Element
 * @param {*} el value
 * @returns {Boolean}
 */
export function isElement(el) {
  return el instanceof Element
}

/**
 * is String
 * @param {*} val value
 * @returns {Boolean}
 */
export function isString(val) {
  return typeof val === 'string'
}

/**
 * Creating element
 * @param {String} name Element Name
 * @param {String} className Element className
 * @returns {HTMLElement}
 */
export function createElement(name, className) {
  const dom = document.createElement(name)
  if (className) dom.className = className
  return dom
}

/**
 * Creates svg element
 * @param {String} name Element Name
 * @param {Object} obj Objects of key-value pairs
 * @returns {SVGElement}
 */
export function createSVG(name, obj) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name)
  for (const key in obj) el.setAttribute(key, obj[key])
  return el
}

/**
 * Creates close SVG
 * @returns {SVGElement} closeSVG
 */
export function createCloseSVG() {
  const closeSVG = createSVG('svg', {
    width: '16px',
    height: '16px',
    stroke: 'currentColor',
    viewBox: '0 0 16 16',
    'stroke-linecap': 'round'
  })
  const line1 = createSVG('line', { x1: -7, y1: -7, x2: 6, y2: 6, transform: 'translate(8.5 8.5)' })
  const line2 = createSVG('line', { x1: 6, y1: -7, x2: -7, y2: 6, transform: 'translate(8.5 8.5)' })
  closeSVG.appendChild(line1)
  closeSVG.appendChild(line2)
  return closeSVG
}

/**
 * Set the position of the message
 * @param {Array} instances All instances of message
 * @param {Element} startIndex Start index to begin traversal
 */
export function setPosition(instances, startIndex = 0) {
  if (startIndex < -1) return
  let prevOffset = 0
  for (let i = startIndex; i < instances.length; i++) {
    const el = instances[i]
    if (!el) continue
    const prev = instances[i - 1]
    if (prev) {
      prevOffset = parseInt(prev.style.top) + parseInt(prev.offsetHeight)
    }
    el.style.zIndex = el._msg.zIndex + i
    el.style.top = el._msg.offset + prevOffset + 'px'
  }
}
