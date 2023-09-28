const router = require("express").Router();
const Product = require("../models/Product.model");

//TODO only admin!
//  POST /api/products  -  Creates a new product
router.post("/products", (req, res) => {
    const {
        name,
        botanicalName,
        description,
        imageUrl,
        price,
        inStock,
        petFriendly,
        feedingRquirements,
        category,
        placement } = req.body;

    Product.create({ name, botanicalName, description, imageUrl, price, inStock, petFriendly, category, feedingRquirements, placement })
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => res.json(err));
});

//TODO only admin!
// DELETE  /api/products/:productId  -  Deletes a specific product by id
router.delete('/products/:productId', (req, res) => {
    const { productId } = req.params;

    Product.findByIdAndRemove(productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json('Product not found!')
            }
            res.status(200).json({ message: `Product with ${productId} removed successfully.` })
        })
        .catch(error => res.json(error));
});

//TODO only admin!
// PUT  /api/product/:productId  -  Updates a specific product by id
router.put('/products/:productId', (req, res) => {
    const { productId } = req.params;

    Product.findByIdAndUpdate(productId, req.body, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                return res.status(404).json('Product not found!')
            }
            res.status(201).json(updatedProduct)
        })
        .catch(error => res.json(error));
});

//  GET /api/products/:productId -  Retrieves a specific products by id
router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;

    Product.findById(productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json('Product not found!')
            }
            res.status(200).json(product)
        })
        .catch(error => res.json(error));
});

// GET /api/products -  Retrieves all products
router.get('/products', (req, res) => {

    Product.find()
        .then(allProducts => res.status(200).json(allProducts))
        .catch(err => res.json(err));
});

module.exports = router;