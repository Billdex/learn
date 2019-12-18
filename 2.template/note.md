# Vue模板语法  

---
## 2.1 插值
### 2.1.1 文本  
数据绑定最基本的方式就是使用了类似`Mustache`的语法，即双花括号`{{ }}`，标签内的内容会被替换为实际属性的值，一旦数据对象发生了更新，文本处的内容也会随之更新。  
```html
<span>{{ msg }}</span>
<span>{{ data1 + data2 }}</span>
```
如果希望`msg`的处展示的文本只在载入或第一次使用的时候初始化，之后的数据更新不再改编文本内容，可以使用`v-once`指令。
```html
<span v-once>{{ msg }}</span>
```

### 2.1.2 HTML文本  
使用`{{ }}`解析出来的内容是普通文本，不会按照html的规则进行解析，如果想要动态引入html文本并解析，可以使用`v-html`，不过`v-html`里的vue模板内容不会被解析和数据绑定。
```html
<span id="elId" v-html="htmlInfo"></span>
<script>
var vm = new Vue({
    el: "#elId",
    data : '...',
});
</script>
```
注意，使用html文本解析存在xss攻击的风险，务必只对可信任的内容使用html文本插值。

### 2.1.3 JavaScript表达式
在文本模板中，不只是能简单地绑定属性键值，也可以使用Js的表达式实现数据的计算和处理，如：
```html
<span>{{data1 + data2}}</span>
<span>{{data>0 ? 'true' : 'false'}}</span>
<span>{{arrList.split('')}}</span>
```
注意，文本模板只能处理单个`表达式`，不能处理`语句`，下面这几种是属于`语句`，在解析时会报错：
```html
<span>{{var a = 1}}</span>
<span>{{if (hey) {return 1} }}</span>
```

## 2.2 指令  
在使用了Vue的项目的html文件里，带有`v-`前缀的特殊属性叫做`指令`。
### 2.2.1 参数  
如`v-bind`、`v-on`等指令可以可以接收一个参数，用于动态地更新更新一些DOM元素的`特性`，或监听DOM`事件`。
```html
<div id="elId">
    <span v-bind:href="url">...</span>
    <span v-on:mouseenter="doSomething">...</span>
</div>
```
`v-bind`的参数是属性`href`，绑定的数据在`data`里，`v-on`的参数是事件`mouseenter`，绑定的响应方法在`methods`里。
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
如果在一个元素中需要多次使用`v-bind`和`v-on`，可以将参数整合到一起（不要漏掉花括号`{}`）:
```html
<span v-bind="{title: titleInfo, href: url}"></span>
<span v-on="{click: doClick, mouseenter: doEnter}"></span>
```
