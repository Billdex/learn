var app = new Vue({
    el: "#app",
    data: {
        foodList:[
            {
                name: "veg",
                price: 3.2,
                discount: 0.6
            },
            {
                name: "meat",
                price: 15,
                discount: 0.7
            },
            {
                name: "fish",
                price: 12.8,
            }
        ]
    }
})