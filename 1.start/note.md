# Vue基本内容介绍

---

## 1.0 Vue引入  
生产环境建议直接使用CDN引入
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

## 1.1 数据绑定  
在js中新建Vue实例，通过el属性连接到对应元素即可完成Vue实例到DOM的数据传递。  
html渲染时使用`{{ }}`作为模板，里面为需要渲染的数据，数据内容写在Vue实例的data属性中。
```html
<div id="elId">{{message}}</div>
```
```javascript
var vm = new Vue({
    el: "#elId",
    data: {
        message:"message-info",
    }   
});
```

## 1.2 v-bind  
`v-bind`可以绑定元素的属性，如title、hidden、style等。
```html
<div id="elId" v-bind:title="title"></div>
<script>
var vm = new Vue({
    el: "#elId",
    data: {
        title:"title name",
    }   
});
</script>
```
`v-bind:`也可以简写为`:`，即：
```html
<div id="elId" :title="title"></div>
```

## 1.3 v-on
`v-on`与`v-bind`用法类似，但`v-on`是用来绑定元素的事件，如click、mouseon等。
```html
<button id="elId" v-on:click="clickButton"></button>
```
事件对应的方法写在Vue对象的method中：
```javascript
var vm = new Vue({
    el:"#elId",
    methods:{
        methodName: function(){
            
        }            
}
});
```
`v-on:`也可以简写为`@`，即：
```html
<div id="elId" @click="clickButton"></div>
```

## 1.4 v-if  
`v-if`可以用于确定某个元素存在，当`v-if`指向的值为true时存在，为false时不存在，即从DOM中删除。
```html
<div id="elId" v-if="if-value"></div>
```

## 1.5 v-for  
`v-for`可以用来绑定一个数组从而渲染一个列表。
```html
<div id="elId">
    <ol>
        <li v-for="item in items">
            {{item.info}}}
        </li>
    </ol>
</div>
<script>
var vm = new Vue({
    el: "#elId",
    data:{
        items:[
            {info: ...},
            {info: ...},
        ],
    },
});
</script>
```

## 1.6



