var template = new Vue({
    el: "#template",
    data: {
        data1: 1,
        data2: 3,
        text: '初始化的text内容',
        html: '<button style="color: orange">html插值生成的按钮</button>',
        title: '链接',
        url: 'http://www.baidu.com',
        buttonInfo: '鼠标移上来试试',
    },
    methods:{
        mEnter: function(){
            this.buttonInfo = '鼠标进来了';
        },
        mOut: function(){
            this.buttonInfo = '鼠标出去了';
        },
    },
});