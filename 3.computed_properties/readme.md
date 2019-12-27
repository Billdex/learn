# 计算属性与监听器  

---

## 3.1 计算属性  

### 3.1.1 基础用法

虽然模板中可以通过表达式处理一些运算，实时动态地展示处理过的数据，但当逻辑变得复杂时便会提高模板的维护成本，而且同样的逻辑需要多次使用时也会不太方便。  

`计算属性` 可以用来解决这个问题，并且可以实现更复杂的、非单句JS表达式所能处理的功能。它的数据绑定方式跟普通模板属性的绑定方式**完全一样**，非常方便：

```html
<div id="elId"><span>{{ computedMsg }}</span></div>
```

不过， `计算属性` 的数据在 Vue实例 中不是写在 `data` 里值，而是写在 `computed` 中的函数，通过return的值得到计算结果：

```javascript
var vm = new Vue({
    el: "#elId",
    data:{
        somedata,
    },   
    computed:{
        computedMsg: function(){
            return someComputed;
        },
    },   
});
```

其实我们也可以在模板中调用 `methods` 里的方法达到同样的效果：
 
 ```html
<div id="elId"><span>{{ someMethod() }}</span></div>
```
 
使用这种方式在每次渲染时都会调用一次函数，相比之下，在读取 `计算属性` 的时候并不会执行函数，而是从**缓存**中直接获取计算好了的值。如果 `计算属性` 依赖的数据 **(已绑定的响应式数据)** 没有发生更新，那么它缓存的结果也不会发生更新，这避免了一些复杂运算时的性能开销。但如果依赖的数据**全都不是**响应式的(比如Vue实例外部的全局变量)，那么它在第一次计算之后便不会再更新。  

两种方式都可以达到所需要的效果，具体使用 `计算属性` 还是 `方法(method)` 还需要根据实际用途来决定。 

### 3.1.2 getter 与 setter

以上的基础用法调用的是计算属性默认的 `getter` 。计算属性不能进行赋值操作, 会报错：

```text
[Vue warn]: Computed property "xxxx" was assigned to but it has no setter.
```

它提示我们这个计算属性没有 `setter` 方法，不过我们可以自己提供一个：

```javascript
var vm = new Vue({
    computed:{
        computedMsg:{
            //getter 默认情况
            get: function(){
                return someComputed;
            },
            //setter
            set: function(Value){
                doSomething
            },
        } 
}
});
```

设置好之后，JS在执行 `vm.computedMsg = 'xxx'` 的语句时，就会执行 `setter` 里的方法了。  

本质上说， `setter` 在执行时并不能直接对计算属性进行**赋值**，而是通过修改 `getter` 中关联的值，引起计算属性的**重新计算**，从而达到更新页面的效果。  

**`getter` 与 `setter` 是相互独立的，如果 `setter` 中修改的值都没有被 `getter` 使用，那么计算属性的值不会更新。**

## 3.2 侦听器  

### 3.1.1  

相较计算属性，`侦听器` 可以更通用地响应数据变化。它主动监听某个数据，它不像计算属性那样在关联的数据更新时执行并得出一个值，而是在该数据发生更新时做出回应，执行一段操作。

`侦听器` 写在 `watch` 中，方法名为所需要监听的 `data` 中的响应式变量的名称：

```javascript
var vm = new Vue({
    el: "#elId",
    data:{
        watchData,
    },
    watch:{
        watchData: function(newData, oldData){
            doSomeThing;
        },
    },
}); 
```

`侦听器` 也使用了缓存，如果监听的 `data` 中的值没有更新，即使页面重新渲染了也不会触发执行该函数。

`侦听器` 有两个参数 `(新数据， 旧数据)` ，如果要反映监听的数据的前后变化关系，可以在调用时直接使用，



