var app = new Vue({
    el: "#app",
    data: {
        picked: "vue"
    },
    computed: {
        image: function () {
            return "img/"+this.picked+".png"
        },
        checkedVue: function () {
            return this.picked==="vue" ? "isChecked" : ""
        },
        checkedReact: function () {
            return this.picked==="react" ? "isChecked" : ""
        },
        checkedAngular: function () {
            return this.picked==="angular" ? "isChecked" : ""
        }
    }
})