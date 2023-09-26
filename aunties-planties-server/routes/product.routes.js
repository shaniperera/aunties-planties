const router = require("express").Router();
const Product = require("../models/Product.model");

//TODO only admin!
//  POST /api/products  -  Creates a new product
router.post("/products", (req, res, next) => {
    const {
        name,
        botanicalName,
        description,
        price,
        imageUrl,
        inStock,
        petFriendly,
        feedingRquirements,
        category,
        placement } = req.body;

    Product.create({ name, botanicalName, description, price, imageUrl, inStock, petFriendly, category, feedingRquirements, placement })
        .then(response => {
            res.status(201).json(response)
            console.log(response)
        })
        .catch(err => res.json(err));
});

//TODO only admin!
// DELETE  /api/products/:productId  -  Deletes a specific product by id
router.delete('/products/:productId', (req, res, next) => {
    const { productId } = req.params;

    Product.findByIdAndRemove(productId)
        .then(() => res.json({ message: `Product with ${productId} is removed successfully.` }))
        .catch(error => res.json(error));
});

//TODO only admin!
// PUT  /api/product/:productId  -  Updates a specific product by id
router.put('/products/:productId', (req, res, next) => {
    const { productId } = req.params;

    Product.findByIdAndUpdate(productId, req.body, { new: true })
        .then((updatedProduct) => res.json(updatedProduct))
        .catch(error => res.json(error));
});

//  GET /api/products/:productId -  Retrieves a specific products by id
router.get('/products/:productId', (req, res, next) => {
    const { productId } = req.params;
    console.log("prod id ====", productId)

    Product.findById(productId)
        .then(product => res.status(200).json(product))
        .catch(error => res.json(error));
});

// GET /api/products -  Retrieves all products
router.get('/products', (req, res, next) => {

    Product.find()
        .then(allProducts => res.json(allProducts))
        .catch(err => res.json(err));

});

module.exports = router;