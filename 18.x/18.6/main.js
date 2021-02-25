var app = new Vue({
    el: "#app",
    data: {
        sex: "female",
        hobbies: ["sing"],
        article: "",
        from: 0,
        dest: [],
    },
    computed: {
      fromText: function () {
          switch (this.from) {
              case 1: case "1": return "Shanghai"
              case 2: case "2": return "Beijing"
              case 3: case "3": return "Shenzhen"
              default: return "Unknown"
          }
      }
    }
})