var vm = new Vue({
    el: "#computed",
    data:{
        courses:[
          {name: '语文', score: 0},
          {name: '数学', score: 0},
          {name: '英语', score: 0},
        ],
        red: 245,
        green: 112,
        blue: 129,
        gray: 0,
        inputGray:0,
        rgbstyle:'',
        graystyle:'',
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
        rgbNum: function () {
            if (this.red > 255){
                this.red = 255;
            }
            if (this.green > 255){
                this.green = 255;
            }
            if (this.blue > 255){
                this.blue = 255;
            }
            if (this.red < 0){
                this.red = 0;
            }
            if (this.green < 0){
                this.green = 0;
            }
            if (this.blue < 0){
                this.blue = 0;
            }
            let rgbDict = '('+ this.red+ ',' + this.green + ',' + this.blue + ')';
            this.rgbstyle = "float:left; margin:10px; width:200px; height:50px; background-color: rgb" + rgbDict + ";";
            return rgbDict;
        },
        grayNum:{
            get:function () {
                this.gray = parseInt((this.red*255 + this.green*587 + this.blue*114 + 500)/1000);
                let grayDict = '('+ this.gray+ ',' + this.gray + ',' + this.gray + ')'
                this.graystyle = "float:left; margin:10px; width:200px; height:50px; background-color:rgb" + grayDict + ";";
                return this.gray;
            },
        }
    },
    methods:{
        getTime: function (){
            return (new Date());
        },
    },

});

var vm2 = new Vue({
    el: "#elSetter",
    data: {
        firstName: "Luo",
        lastName: "JiaoJiao",
        inputName: "",
    },
    computed: {
        fullName: {
            get: function(){
                return this.firstName + ' ' + this.lastName;
            },
            set: function(newName) {
                var names = newName.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    },
    methods:{
        setName: function(){
            this.fullName = this.inputName;
        }
    },

});