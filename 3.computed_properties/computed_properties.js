var vm = new Vue({
    el: "#computed",
    data:{
        courses:[
          {name: '语文', score: 0},
          {name: '数学', score: 0},
          {name: '英语', score: 0},
        ],
    },
    computed:{
        sumOfScore: function () {
            let sum = 0;
            for(course of this.courses){
                sum = sum + (course.score === '' ? 0 : course.score);
            }
            return parseFloat(sum);
        },
        avgOfScore: function () {
            return parseFloat(this.sumOfScore/this.courses.length).toFixed(2);
        },
        startTime: function () {
            return (new Date);
        },
    },
    methods:{
        getTime: function (){
            return (new Date());
        },
    },

});