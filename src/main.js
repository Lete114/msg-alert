import unique from 'simple-unique'
import { isElement, isString, createElement, createCloseSVG, setPosition } from './utils'
import styles from './main.css'

const OPACITY = '_msg-opacity'
const instances = []
const typeMap = ['info', 'success', 'warn', 'error']

const style = createElement('style')
style.textContent = styles
document.head.appendChild(style)

msg.zIndex = 1

// eslint-disable-next-line max-statements
export default function msg(options) {
  if (isString(options)) options = { text: options }

  const { text, type, zIndex, offset, duration, customClass, html, showClose, onClose, appendTo } = Object.assign(
    {
      type: typeMap[0],
      text: '',
      offset: 20,
      duration: 3e3
    },
    options
  )

  const el = createElement('div', `_msg _msg-${type} ${OPACITY} ${customClass || ''}`)
  el.id = unique()
  el._msg = {}
  el._msg.zIndex = zIndex || msg.zIndex
  el._msg.offset = offset
  instances.push(el)

  // 淡入
  setTimeout(() => {
    el.classList.remove(OPACITY)
  }, 100)

  // 持续时间大于0才会销毁，反之永不销毁
  // (可通过点击关闭按钮 或 调用destroyAll函数来销毁)
  if (duration) {
    el._msg.t = setTimeout(() => {
      destroy(el, onClose)
    }, duration)

    // 鼠标悬停取消销毁
    el.onmouseenter = function () {
      clearTimeout(el._msg.t)
    }

    // 鼠标离开后，开始计时销毁
    el.onmouseleave = function () {
      el._msg.t = setTimeout(() => {
        destroy(el, onClose)
      }, duration)
    }
  }

  const p = createElement('p')
  el.appendChild(p)
  if (html) p.innerHTML = text
  else p.innerText = text

  // 是否显示关闭按钮
  if (showClose || !duration /* 如果持续时小于等于0，则强制显示关闭按钮 */) {
    const closeSVG = createCloseSVG()
    closeSVG.onclick = function () {
      clearTimeout(el._msg.t)
      el.onmouseenter = el.onmouseleave = closeSVG.onclick = null
      destroy(el, onClose)
    }
    el.appendChild(closeSVG)
  }

  let _appendTo
  if (isElement(appendTo)) _appendTo = appendTo
  else if (isString(appendTo)) _appendTo = document.querySelector(appendTo)

  if (!isElement(_appendTo)) _appendTo = document.body

  _appendTo.appendChild(el)

  setPosition(instances)
}

for (const i in typeMap) {
  msg[typeMap[i]] = (options) => {
    if (isString(options)) {
      options = { text: options, type: typeMap[i] }
    } else {
      options.type = typeMap[i]
    }
    msg(options)
  }
}

msg.destroyAll = function () {
  for (let i = 0; i < instances.length; i++) {
    const el = instances[i]
    clearTimeout(el._msg.t)
    // 等待淡出动画结束后删除
    el.classList.add(OPACITY)
    setTimeout(() => {
      el.parentElement.removeChild(el)
    }, 400)
  }
  instances.length = 0
}

/**
 * Destroy message
 * @param {Element} el Messages that need to be destroyed
 * @param {Function} onClose Before close callback function
 */
function destroy(el, onClose) {
  const index = instances.findIndex((_el) => _el.id === el.id)
  instances.splice(index, 1)
  setPosition(instances, index)

  if (typeof onClose === 'function') onClose()

  // 等待淡出动画结束后删除
  el.classList.add(OPACITY)
  setTimeout(() => {
    el.parentElement.removeChild(el)
  }, 400)
}
