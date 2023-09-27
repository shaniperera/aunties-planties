const router = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// router.post('/user/cart', isAuthenticated, (req, res) => {
//     const { _id } = req.payload;
//     // console.log(req.payload);
//     const { productId, quantity, price } = req.body;
//     // console.log("req. body:", products);

//     let userCart;
//     let productToAdd;

//     Cart.findOne({ user: _id })
//         .populate('products')
//         .then((foundCart) => {
//             userCart = foundCart;
//             console.log("This is the userCart ===", userCart);

//             return Product.findOne({ _id: productId })
//         })
//         .then((product) => {
//             productToAdd = product;
//             console.log("The productToAdd ===", productToAdd);

//             if (userCart) {
//                 let itemIndex = userCart.products.findIndex(p => p.productId == productId);
//                 console.log("item index======", itemIndex);
//                 // If no elements satisfy the testing function, -1 is returned.
//                 if (itemIndex > -1) {
//                     //product exists in the cart, update the quantity
//                     let productItem = userCart.products[itemIndex];
//                     console.log("the prod in the array:", productItem)
//                     productItem.quantity = quantity;
//                     userCart.products[itemIndex] = productItem;
//                     console.log("data for updated prod:", userCart.products[itemIndex])
//                 } else {
//                     //product does not exists in cart, add new item
//                     userCart.products.push(productToAdd);
//                     console.log("new user cart:", userCart)
//                 } userCart.save();
//                 return res.status(201).send(userCart);
//             }

//         })
//         .catch(err => res.json(err));
// })

// GET user's cart
// router.get('/user/cart', isAuthenticated, (req, res, next) => {
//     const { _id } = req.payload

//     Cart.findOne({ user: _id })
//         .populate('products')
//         .then((cart) => {
//             console.log(cart)
//             if (cart) {
//                 res.status(200).json(cart);
//             } else {
//                 res.status(200).json(null);
//             }
//         })
//         .catch(err => res.json(err));
// })


//GET user's cart
router.get('/user/cart', isAuthenticated, (req, res, next) => {

    const { _id } = req.payload;

    User.findById({ _id })
        .populate('cart')
        .then((user) => {
            console.log("User's cart:=== ", user.cart)
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

    let user;
    let productToAdd;

    User.findById({ _id })
        .populate('cart')
        .then((foundUser) => {
            user = foundUser;
            return Product.findOne({ _id: prodToAdd.productId })
        })
        .then((product) => {
            if (!product) {
                res.status(404).send('Prod not found!')
                return
            }
            productToAdd = product;
            if (user.cart.length > 0) {
                console.log("Cart exists: length:", user.cart.length);

                const strProductToAddId = productToAdd._id.toString()
                console.log("prod. to add str. ", strProductToAddId)
                for (let i = 0; i < user.cart.length; i++) {
                    const existingProductId = user.cart[i].productId.toString();
                    console.log("existing prod. str: ", existingProductId)

                    if (existingProductId === strProductToAddId) {
                        console.log(`if block is working`)
                        console.log(existingProductId, strProductToAddId)

                        console.log(`This item is exist!`)
                        // add quantity from body to exist item 
                        user.cart[i].quantity += prodToAdd.quantity
                        console.log(`upcoming quantity`, prodToAdd.quantity)
                        return user.save().then(() => {
                            res.status(201).send(user.cart);
                        })
                    } else {
                        user.cart.push(prodToAdd);
                        return user.save().then(() => {
                            res.status(201).send(user.cart);
                        })
                    }
                    // else if (existingProductId !== strProductToAddId) {
                    //     console.log(existingProductId, strProductToAddId)
                    //     console.log(`else if block is working`)
                    //     user.cart.push(prodToAdd);
                    //     return user.save().then(() => {
                    //         res.status(201).send(user.cart);
                    //     })
                    // }
                }

            }
            else {
                console.log("Cart does not exist!")
                // add new product
                user.cart.push(prodToAdd);
                console.log("== New user cart: ===", user.cart)
                return user.save().then(() => {
                    res.status(201).send(user.cart);
                })
            }
        })
        .catch(err => res.json(err));
})

router.post('/user/cart/delete', isAuthenticated, (req, res, next) => {

    const { _id } = req.payload; // logged in userId
    const prodToDelete = { productId: req.body.productId }
    console.log("the prod to delete:", prodToDelete);

    let user;

    User.findById({ _id })
        .populate('cart')
        .then((foundUser) => {
            user = foundUser;
            return Product.findOne({ _id: prodToDelete.productId })
        })
        .then((product) => {
            console.log("Found product to delete:", product)
            if (!product) {
                res.status(404).send('Prod not found!')
                return
            }
            user.cart.splice(product, 1);
            console.log("The updated user cart", user.cart)
            // productToDelete = product;

            // const strProductToDeleteId = prodToDelete._id.toString()
            // for (let i = 0; i < user.cart.length; i++) {
            //     const existingProductId = user.cart[i].productId.toString()

            //     if (existingProductId === strProductToAddId) {

            //         user.cart.spilce(user.cart[i]);
            //     } 
            // }
            return user.save().then(() => {
                res.status(201).send(user.cart);
            })
        })
        .catch(err => res.json(err));


})

module.exports = router;