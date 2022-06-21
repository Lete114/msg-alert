import unique from 'simple-unique'
import { isElement, isString, createElement, createCloseSVG, setTop } from './utils'
import styles from './main.css'

const OPACITY = '_msg-opacity'
const instances = []
const typeMap = ['info', 'success', 'warn', 'error']

const style = createElement('style')
style.textContent = styles
document.head.appendChild(style)

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

function destroy(el, duration, offset) {
  // 延迟删除
  return setTimeout(() => {
    // 淡出
    el.style.top = 0
    el.classList.add(OPACITY)
    // 等待淡出动画结束后删除
    setTimeout(() => {
      el.parentElement.removeChild(el)

      const id = instances.findIndex((_el) => _el.id === el.id)
      instances.splice(id, 1)
      // 删除后重新设置其它元素的top(替补删除元素的位置)
      for (const i in instances) setTop(offset, instances[i])
    }, 200)
  }, duration)
}

msg.destroyAll = function () {
  for (const i in instances) {
    clearTimeout(instances[i].t)
    destroy(instances[i])
  }
}
// eslint-disable-next-line max-statements
export default function msg(options) {
  if (isString(options)) options = { text: options }

  let isClose
  const { text, type, offset, duration, customClass, html, showClose, onClose, appendTo } = Object.assign(
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
  instances.push(el)

  // 淡入
  setTimeout(() => {
    el.classList.remove(OPACITY)
  }, 100)

  // 持续时间大于等于1才会销毁，反之永不销毁
  // (可通过点击关闭按钮 或 调用关闭所有函数来销毁)
  if (duration) {
    // 鼠标悬停取消销毁
    // el.t === el.timer
    el.t = destroy(el, duration, offset)
    el.onmouseenter = function () {
      if (isClose) return
      clearTimeout(el.t)
    }

    // 鼠标离开后，超过指定时间后销毁
    el.onmouseleave = function () {
      if (isClose) return
      el.t = destroy(el, duration, offset)
    }
  }

  const p = createElement('p')
  el.appendChild(p)
  if (html) p.innerHTML = text
  else p.innerText = text

  // 是否显示关闭按钮
  // 如果持续时小于等于0，则强制显示关闭按钮
  if (showClose || !duration) {
    const closeSVG = createCloseSVG()
    closeSVG.onclick = function () {
      clearTimeout(el.t)
      isClose = true
      destroy(el, 0, offset)
    }
    el.appendChild(closeSVG)
  }

  let _appendTo
  if (isElement(appendTo)) _appendTo = appendTo
  else if (isString(appendTo)) _appendTo = document.querySelector(appendTo)
  if (!isElement(appendTo)) _appendTo = document.body
  _appendTo.appendChild(el)

  setTop(offset, instances[instances.length - 1])
}
