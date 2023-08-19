const express = require('express');
const router = express.Router();
const Product = require('../models/product')

router.get('/products', async (req, res) => {

    try {
        let fetechedProducts;
        let ProductCount;
        let pageNumber = +req.query.page;
        let pageSize = +req.query.pageSize;

        if (pageNumber && pageSize) {
            fetechedProducts = await Product.find().skip(pageSize * (pageNumber - 1)).limit(pageSize);
            ProductCount = await Product.count();

        } else {
            fetechedProducts = await Product.find();
            ProductCount = await Product.count();
        }

        res.render('products', { products: fetechedProducts, totalProductCount: ProductCount })

    } catch (error) {
        console.log(error);
    }

})

router.post('/products', async (req, res) => {
    const newProductData = req.body;
    console.log(newProductData);
    try {
        //post new product using Product module?
        const newProduct = new Product({
            id: newProductData.id,
            title: newProductData.title,
            price: newProductData.price,
            description: newProductData.description,
            category: newProductData.category,
            image: newProductData.image,
            rating: {
                rate: newProductData.reatingCount,
                count: 120,
            },
        })
        newProduct.save().then((data) => {
            console.log('New Product Added!');
        })
    } catch (err) {
        console.log(err);
    }

})


// Get single product
router.post('/singleProduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const SingleProduct = await Product.findOne({ id: productId })

        if (!SingleProduct) {
            return res.send({ message: 'No Product found' });
        }

        res.send(SingleProduct)

    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            message: "Internal server error",
        });
    }
})

module.exports = router;