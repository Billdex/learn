//基础绑定
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});
// v-bind绑定元素属性
var app2 = new Vue({
    el: '#app-2',
    data: {
        miao: '页面加载于 ' + new Date().toLocaleString()
    }
});
//v-if判断是否显示某个元素
var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

//v-for可以循环获取js数组对象
var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: '学习 JavaScript' },
            { text: '学习 Vue' },
            { text: '开搞MiniCubeComp' }
        ]
    }
});
//v-on可以绑定监听器，比如click
var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
});
//v-model可以用来进行双向绑定
var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
});

//component组件
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});
var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
});

var miao = new Vue({
    el: "#miao",
    data:{
        message: "hey, 鼠标移上来看看",
        msgTitle:"看到我了吗",
        seen : true,
        miaoList :[
            {info: 'miao1'},
            {info: 'miao2'},
            {info: 'miao3'},
        ],
        inputInfo: '',
        tips: '',
    },
    methods:{
        msgDisappear: function () {
            this.seen = this.seen !== true;
        },
        miaoPush:function () {
            this.miaoList.push({info: 'miao' + (this.miaoList.length+1)});
        },
        addToList: function(){
            this.miaoList.push({info: this.inputInfo});
            this.tips = '添加成功';
        },
        delFromList: function(){
            for(let i in this.miaoList){
                if (this.miaoList[i].info === this.inputInfo){
                    this.miaoList.splice(i, 1);
                    i = i -1;
                    this.tips = '删除成功';
                    return
                }
            }
            this.tips = '删除失败';
        },
    }
});