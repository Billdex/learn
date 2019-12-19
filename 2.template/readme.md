# Vue 模板语法  

---

## 2.1 插值

### 2.1.1 文本
  
**数据绑定** 最基本的方式就是使用了类似 `Mustache` 的语法，即双花括号 `{{ }}`，标签内的内容会被替换为实际属性的值，一旦数据对象发生了更新，文本处的内容也会随之更新。  

```html
<span>{{ msg }}</span>
```

如果希望 `msg` 的处展示的文本只在载入或第一次使用的时候初始化，之后的数据更新不再改编文本内容，可以使用 `v-once` 指令。

```html
<span v-once>{{ msg }}</span>
```

### 2.1.2 HTML 文本  

使用 `{{ }}` 解析出来的内容是普通文本，不会按照 html 的规则进行解析，如果想要动态引入 html 文本并解析，可以使用 `v-html`，不过 `v-html` 里的 vue 模板内容不会被解析和数据绑定。

```html
<span id="elId" v-html="htmlInfo"></span>
<script>
var vm = new Vue({
    el: "#elId",
    data: {
        htmlInfo: '...'
    },
});
</script>
```

**注意：使用 html 文本解析存在 xss 攻击的风险，务必只对可信任的内容使用 html 文本插值。**

### 2.1.3 JavaScript 表达式

在文本模板中，不只是能简单地绑定属性键值，也可以使用 Js 的表达式实现数据的计算和处理，如：

```html
<span>{{data1 + data2}}</span>
<span>{{data > 0 ? 'true' : 'false'}}</span>
<span>{{string.split('')}}</span>
```

**注意：文本模板只能处理单个 `表达式`，不能处理 `语句`，**  

下面这几种写法属于 `语句`，在解析时会报错：

```html
<span>{{var a = 1}}</span>
<span>{{if (hey) {return 1} }}</span>
```

## 2.2 指令  

在使用了 Vue 的项目的 html 文件里，带有 `v-` 前缀的特殊属性叫做 `指令`。

### 2.2.1 参数  

如 `v-bind`、`v-on` 等指令可以可以接收一个参数，用于动态地更新更新一些 DOM 元素的 `特性`，或监听 DOM `事件`。

```html
<div id="elId">
    <span v-bind:href="url">...</span>
    <span v-on:mouseenter="doSomething">...</span>
</div>
```

`v-bind` 的参数是属性 `href`，绑定的数据在 `data` 里，`v-on` 的参数是事件 `mouseenter`，绑定的响应方法在 `methods` 里。

```javascript
var vm = new Vue({
    el: "#elId",
    data:{
        url: "http://baidu.com",
    },
    methods:{
        doSomething: function(){
            return 1;
        },
    },
});

```

如果在一个元素中需要多次使用 `v-bind` 和 `v-on`，可以将参数整合到一起（不要漏掉花括号 `{}`）:

```html
<span v-bind="{title: titleInfo, href: url}"></span>
<span v-on="{click: doClick, mouseenter: doEnter}"></span>
```

### 2.2.2 动态参数  

不止属性值可以使用变量或JS表达式来确定值，指令的参数也可以，也就是绑定的html的属性或事件可以用JS表达式确定。

```html
<a v-bind:[attributeName]="url"> ... </a>
<button v-on:[attributeName]="doSomething"></button>
```

`attributeName` 可以是一个变量，也可以是一个JS表达式，最终结果会是一个字符串参数，如果值为 `null` 可以被视为显性地解除了绑定。  

**注意：表达式不要包含空格与引号，变量也尽量不要使用大写(HTML对属性和属性值大小写不敏感)**

### 2.2.3 修饰符

指令后面可以使用 `.` 连接修饰符，用于指定指令以某种特殊方式绑定。例如：

```html
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!--输入时只取数字-->
<input type="text" v-model.number="age">
<!--输入时过滤首尾空格-->
<input type="text" v-model.trim="msg">
```

