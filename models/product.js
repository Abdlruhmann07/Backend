const mongoose = require('mongoose');
const Product_Schema = mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    },
})

const Product = mongoose.model("Product", Product_Schema);
module.exports = Product;