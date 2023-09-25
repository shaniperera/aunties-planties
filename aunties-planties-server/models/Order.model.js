const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        user: {
            type: { type: Schema.Types.ObjectId, ref: 'User' },
        },
        products: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        },
        totalPrice: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['fulfilled', 'open']
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model('Order', orderSchema);
