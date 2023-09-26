const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        user: {
            type: { type: Schema.Types.ObjectId, ref: 'User' }
        },
        cart: {
            type:
                { type: Schema.Types.ObjectId, ref: 'Cart' }
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
