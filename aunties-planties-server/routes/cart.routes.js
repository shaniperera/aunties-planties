const router = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");

//GET user's cart
router.get('/user/cart', (req, res) => {

    const { _id } = req.payload;

    User.findById({ _id })
        .populate('cart.productId')
        .then((user) => {
            if (user.cart.length > 0) {
                res.status(200).json(user.cart);
            } else {
                res.status(200).json({ message: "Your cart is empty" });
            }
        })
        .catch(err => res.json(err));
})

//POST: to add/update cart
router.post('/user/cart', (req, res) => {
    const { _id } = req.payload; // logged in userId
    const prodToAdd = { productId: req.body.productId, quantity: req.body.quantity }

    let currentUser;

    User.findById({ _id })
        .then((foundUser) => {
            currentUser = foundUser;
            return Product.findById({ _id: prodToAdd.productId })
        })
        .then((product) => {

            if (!product) {
                return res.status(404).json('Product not found!')
            }
            if (currentUser.cart.length > 0) {

                const existingProduct = currentUser.cart.find(item => item.productId.toString() === prodToAdd.productId);

                if (existingProduct) {
                    existingProduct.quantity = prodToAdd.quantity;

                } else {
                    currentUser.cart.push(prodToAdd);
                    console.log(prodToAdd);
                }
                return currentUser.save().then(() => {
                    res.status(201).json(currentUser.cart);
                })
            } else {
                currentUser.cart.push(prodToAdd);
                return currentUser.save().then(() => {
                    res.status(201).json(currentUser.cart)
                });
            }
        })
        .catch(err => res.json(err));
})

//POST : delete product from cart
router.delete('/user/cart', (req, res) => {

    const { _id } = req.payload;
    const prodToDelete = { productId: req.body.productId }

    let currentUser;

    User.findById({ _id })
        .then((foundUser) => {
            currentUser = foundUser;
            return Product.findOne({ _id: prodToDelete.productId })
        })
        .then((product) => {
            if (!product) {
                return res.status(404).json("Product not found in the user's cart")
            }

            const indexToDelete = currentUser.cart.findIndex(item => item.productId.toString() === prodToDelete.productId);
            console.log("indexToDelete: ", indexToDelete)
            if (indexToDelete !== -1) {
                currentUser.cart.splice(indexToDelete, 1);
                return currentUser.save().then(() => {
                    res.status(201).json(currentUser.cart);
                })
            } else {
                res.status(404).json("Product not found in the user's cart");
                return;
            }
        })
        .catch(err => res.json(err));
})

module.exports = router;