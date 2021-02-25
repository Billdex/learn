// window 对象下的方法不用写window也可执行
alert('Yo');
// 提示
window.alert('Yo.');
// 确认，返回值为布尔类型
var r = confirm('Are You OK?');
// 输入对话框，返回值为字符串
var name = prompt('What\'s your name?');

// 延时执行（异步），第一个参数为函数，第二个为时间，单位毫秒
setTimeout(function() {
    alert('啦啦啦');
}, 2000);

// 定时执行，隔多久执行一次
var count = 0;
var timer = setInterval(function() {
    console.log('count:' + count++);
    if (count > 10) {
        clearInterval(timer);
    }
}, 1000);
