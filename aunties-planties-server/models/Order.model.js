const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        user: {
            type: { type: Schema.Types.ObjectId, ref: 'User' },
        },
        products: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        },
        quantity: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['fulfilled', 'pending'],
            default: "pending",
            requires: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model('Order', orderSchema);
