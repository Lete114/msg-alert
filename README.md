## Msg-Alert

<a href="https://github.com/Lete114/msg-alert/releases/"><img src="https://img.shields.io/npm/v/msg-alert?logo=npm" alt="Version"></a>
<a href="https://github.com/Lete114/msg-alert/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/msg-alert?color=FF5531" alt="MIT License"></a>

一个简单的气泡消息提示库，仅 3kb

仿 [Element-ui Message](https://element-plus.gitee.io/zh-CN/component/message.html) 组件，由于我特别喜欢这个组件，但奈何它只能应用于 Vue.js，于是就用原生 js 仿造了一个，不敢说 100% 一样，但起码得有 90% 的相似度，如果有优化空间，欢迎 PR👍😁

## 安装

使用 npm:

```bash
npm install msg-alert --save
```

使用 CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/msg-alert"></script>
```

## 使用方法

> 可参考仓库中的 [public/index.html](./public/index.html)

ESModule 模块

```js
import message from 'msg-alert'
// 使用方法如下浏览器使用示例
```

CommonJS 模块

```js
const message = require('msg-alert')
// 使用方法如下浏览器使用示例
```

在浏览器中使用

```html
<script src="https://cdn.jsdelivr.net/npm/msg-alert"></script>
<script>
  // 默认 等价 message({type:'info',text:'这是一个段落'})
  message('这是一个段落')
  message.info('这是一个段落')
  // 成功 等价 message({type:'success',text:'success'})
  message.success('success')
  // 警告 等价 message({type:'warn',text:'warn'})
  message.warn('warn')
  // 错误 等价 message({type:'error',text:'error'})
  message.error('error')
</script>
```

## 选项 API

### message.destroyAll

类型: `Function`

销毁所有的 Message

### type

类型: `String`

默认值: `info`

Message 显示类型

### text

类型: `String`

默认值: `''`

Message 显示内容

### offset

类型: `Number`

默认值: `20`

Message 距离窗口顶部的偏移量

### duration

类型: `Number`

默认值: `3000`

Message 显示的持续时间,设置为 0 表示永不关闭 **(单位毫秒)**

### customClass

类型: `String`

默认值: `''`

自定义 Message 的类名

### html

类型: `Boolean`

默认值: `false`

是否将 `text` 属性作为 HTML 片段处理 **(请提前做好仿 [xss](https://en.wikipedia.org/wiki/Cross-site_scripting) 的处理)**

### showClose

类型: `Boolean`

默认值: `false`

是否显示关闭按钮

### onClose

类型: `Function`

默认值: `-`

Message 关闭前的回调函数

### appendTo

类型: `String | HTMLElement`

默认值: `document.body`

设置组件的根元素
链接
