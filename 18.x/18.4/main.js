var app = new Vue({
    el: '#app',
    data: {
        hover: false,
        clickCount: 0,
    },
    methods: {
        onClick: function () {
            this.clickCount++
            console.log("第"+this.clickCount+"次点击")
        },
        onEnter: function () {
            this.hover = true
        },
        onOut: function () {
            this.hover = false
        },
    },
    computed: {
        myStyle: function () {
            if (this.hover) {
                return "buttonHover"
            } else {
                return ""
            }
        }
    }
})