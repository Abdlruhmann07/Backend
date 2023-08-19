// inilaizing router from express
const express = require('express');
const router = express.Router();
// router requirements
const { default: mongoose } = require("mongoose");
// Importing models
const Product = require('../models/product');
const User = require("../models/user");
// Importing middlewares
const { requireAuth, checkUser } = require('../middlewares/authMiddleware')

// Add to car POST
router.post('/addtocart', checkUser, async (req, res) => {

    let toAddedproductId = req.body.productId;
    let cUser = await User.findById({ _id: res.locals.CurrUser._id })
    let updatedUserCart = [...cUser.cart.items];
    let newQuantity = 1;
    let cartProductIndex = await cUser.cart.items.findIndex((cartItem) => {
        return cartItem.productId.toString() == toAddedproductId.toString();
    });
    if (cartProductIndex >= 0) {
        // already in cart
        newQuantity = cUser.cart.items[cartProductIndex].quantity + 1;
        updatedUserCart[cartProductIndex].quantity = newQuantity;
    } else {
        // New item
        updatedUserCart.push({
            productId: new mongoose.Types.ObjectId(toAddedproductId),
            quantity: newQuantity,
        });
    }
    let userCart = {
        items: updatedUserCart,
    };
    const UpdatedUser = await User.updateOne({ _id: cUser._id }, { $set: { cart: userCart } }).catch((err) => {
        console.log(err);
    });
    console.log(UpdatedUser);
})


// Get Cart
router.get("/cart", checkUser, async (req, res) => {
    try {
        const userInfo = await User.findById({ _id: res.locals.CurrUser._id });
        const productsIds = userInfo.cart.items.map((item) => item.productId);
        const retrievedProducts = await Product.find({ _id: { $in: productsIds } });
        const items = retrievedProducts.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
                rate: product.rating.rate,
                count: product.rating.count,
            },
            quantity: userInfo.cart.items.find((item) => item.productId.toString() === product._id.toString()).quantity,
        }));
        res.json({
            cartItems: items,
        });
    } catch (err) {
        console.log(err);
    }
});



module.exports = router;