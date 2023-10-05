const router = require("express").Router();
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);


router.post('/create-checkout-session', async (req, res) => {

    let line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'aud',
                product_data: {
                    name: item.productId.name,
                },
                unit_amount: item.productId.price * 100,
            },
            quantity: item.quantity

        };
    });

    const session = await stripe.checkout.sessions.create({
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1000,
                        currency: 'aud'
                    },
                    display_name: 'Local delivery'
                },

            }
        ],

        line_items,
        mode: 'payment',
        success_url: `${process.env.ORIGIN}/checkout-success`,
        cancel_url: `${process.env.ORIGIN}/user/cart`,
    });

    res.send({ url: session.url });
});

module.exports = router; 