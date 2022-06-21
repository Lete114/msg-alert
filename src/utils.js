/**
 * is Element
 * @param {*} el value
 * @returns {Boolean}
 */
function isElement(el) {
  return el instanceof Element
}

/**
 * is String
 * @param {*} val value
 * @returns {Boolean}
 */
function isString(val) {
  return typeof val === 'string'
}

/**
 * Creating element
 * @param {String} name Element Name
 * @param {String} className Element className
 * @returns {HTMLElement}
 */
function createElement(name, className) {
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
function createSVG(name, obj) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name)
  for (const key in obj) el.setAttribute(key, obj[key])
  return el
}

/**
 * Creates close SVG
 * @returns {SVGElement} closeSVG
 */
function createCloseSVG() {
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
 * Set the spacing of the message
 * @param {Number} offset Message Offset from the top of the window
 * @param {Element} el Elements that need to be spaced
 */
function setTop(offset, el) {
  const prev = el.previousElementSibling
  if (prev.classList.contains('_msg')) {
    offset = parseInt(prev.style.top) + parseInt(prev.offsetHeight)
  }
  el.style.top = offset + 16 + 'px'
}

export { isElement, isString, createElement, createCloseSVG, setTop }
