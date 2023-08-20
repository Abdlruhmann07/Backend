const mongoose = require('mongoose');
const Order_Schema = mongoose.Schema({
    items: [
        {
            id: Number,
            title: String,
            price: Number,
            description: String,
            category: String,
            image: String,
            rating: {
                rate: Number,
                count: Number,
            },
            quantity: Number,
        },
    ],

    user: {
        _id: mongoose.Types.ObjectId,
        userName: String,
        email: String,
    },
})

const Order = mongoose.model("Order", Order_Schema);
module.exports = Order;