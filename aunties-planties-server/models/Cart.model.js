const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                quantity: {
                    type: Number,
                    required: true
                },
            }
        ],
        totalCart: {
            type: Number,
            required: true,
        }
    });

module.exports = model('Cart', cartSchema);
