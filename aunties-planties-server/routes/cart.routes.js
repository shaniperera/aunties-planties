const router = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET user's cart
router.get('/user/cart', isAuthenticated, (req, res) => {

    const { _id } = req.payload;

    User.findById({ _id })
        .populate('cart.productId')
        .then((user) => {
            if (user.cart.length > 0) {
                res.status(200).json(user.cart);
            } else {
                res.status(200).json({ message: "No cart yet" });
            }
        })
        .catch(err => res.json(err));
})

//POST to add to cart
// router.post('/user/cart', isAuthenticated, (req, res) => {
//     const { _id } = req.payload; // logged in userId
//     const { productId, quantity } = req.body;

//     let user;
//     let productToAdd;
//     console.log("Incoming qty:", quantity)
//     User.findById({ _id })
//         .populate('cart')
//         .then((foundUser) => {
//             user = foundUser;
//             console.log("This is the user ===", user);
//             return Product.findOne({ _id: productId })
//         })
//         .then((product) => {
//             productToAdd = product;
//             console.log("The productToAdd =====", productToAdd);
//             // if cart array not empty, check if product to add already exists
//             if (user.cart.length > 0) {
//                 console.log("Cart exists: length:", user.cart.length);

//                 let itemIndex = user.cart.findIndex(p => p.productId === productId);
//                 console.log("item index======", itemIndex);
//                 // If no elements matches, -1 is returned.
//                 if (itemIndex > -1) {
//                     console.log("Product exists in array!")
//                     //product exists in the cart, update the quantity
//                     let productItem = user.cart[itemIndex];
//                     console.log("the prod in the array:", productItem)
//                     productItem.quantity = quantity;
//                     user.cart[itemIndex] = productItem;
//                 } else {
//                     console.log("Cart exists, but product not exisitng")
//                     user.cart.push(productId);
//                     return user.save().then(() => {
//                         res.status(201).send(user.cart);
//                     })

//                 }
//             } else {
//                 console.log("Cart does not exist!")
//                 // add new product
//                 user.cart.push(productId, { quantity })
//                 console.log("== New user cart: ===", user.cart)
//                 console.log(productId)
//                 return user.save().then(() => {
//                     res.status(201).send(user.cart);
//                 })
//             }
//         })
//         .catch(err => res.json(err));
// })

router.post('/user/cart', isAuthenticated, (req, res) => {
    const { _id } = req.payload; // logged in userId
    const prodToAdd = { productId: req.body.productId, quantity: req.body.quantity }

    let currentUser;

    User.findById({ _id })
        .then((foundUser) => {
            currentUser = foundUser;
            return Product.findOne({ _id: prodToAdd.productId })
        })
        .then((product) => {
            if (!product) {
                return res.status(404).send('Product not found!')
            }

            if (currentUser.cart.length > 0) {
                const existingProduct = currentUser.cart.find(item => item.productId.toString() === prodToAdd.productId);
                // console.log("the price", existingProduct.price)
                if (existingProduct) {
                    existingProduct.quantity = prodToAdd.quantity;
                } else {
                    currentUser.cart.push(prodToAdd);
                }
                return currentUser.save().then(() => {
                    res.status(201).send(currentUser.cart);
                })
            } else {
                currentUser.cart.push(prodToAdd);
                return currentUser.save().then(() => {
                    res.status(201).send(currentUser.cart)
                });
            }
            // if (user.cart.length > 0) {
            //     console.log("Cart exists: length:", user.cart.length);

            //     const strProductToAddId = productToAdd._id.toString()
            //     console.log("product to add str. ", strProductToAddId)
            //     for (let i = 0; i < user.cart.length; i++) {
            //         const existingProductId = user.cart[i].productId.toString();
            //         console.log("existing prod. str: ", existingProductId)

            //         if (existingProductId == strProductToAddId) {
            //             console.log(`if block is working`)
            //             console.log(existingProductId, strProductToAddId)

            //             console.log(`This item is exist!`)
            //             // add quantity from body to exist item 
            //             user.cart[i].quantity += prodToAdd.quantity
            //             console.log(`upcoming quantity`, prodToAdd.quantity)
            //             return user.save().then(() => {
            //                 res.status(201).send(user.cart);
            //             })
            //         } else {
            //             user.cart.push(prodToAdd);
            //             return user.save().then(() => {
            //                 res.status(201).send(user.cart);
            //             })
            //         }
            //         // else if (existingProductId !== strProductToAddId) {
            //         //     console.log(existingProductId, strProductToAddId)
            //         //     console.log(`else if block is working`)
            //         //     user.cart.push(prodToAdd);
            //         //     return user.save().then(() => {
            //         //         res.status(201).send(user.cart);
            //         //     })
            //         // }
            //     }

            // }
            // else {
            //     console.log("Cart does not exist!")
            //     // add new product
            //     user.cart.push(prodToAdd);
            //     console.log("== New user cart: ===", user.cart)
            //     return user.save().then(() => {
            //         res.status(201).send(user.cart);
            //     })
            // }
        })
        .catch(err => res.json(err));
})

router.delete('/user/cart', isAuthenticated, (req, res) => {

    const { _id } = req.payload;
    const prodToDelete = { productId: req.body.productId }
    console.log("the prod to delete:", prodToDelete);

    let currentUser;

    User.findById({ _id })
        .then((foundUser) => {
            currentUser = foundUser;
            return Product.findOne({ _id: prodToDelete.productId })
        })
        .then((product) => {
            console.log("Found product to delete:", product)
            if (!product) {
                return res.status(404).send("Product not found in the user's cart")
            }

            const indexToDelete = currentUser.cart.findIndex(item => item.productId.toString() === prodToDelete.productId);
            console.log("indexToDelete: ", indexToDelete)
            if (indexToDelete !== -1) {
                console.log("Index is not -1")
                currentUser.cart.splice(indexToDelete, 1);
                return currentUser.save().then(() => {
                    res.status(201).send(currentUser.cart);
                })
            } else {
                res.status(404).send("Product not found in the user's cart");
                return;
            }
        })
        .catch(err => res.json(err));
})

module.exports = router;