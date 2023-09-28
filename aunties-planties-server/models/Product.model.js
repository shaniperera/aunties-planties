const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        botanicalName: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Boolean,
            required: true,
        },
        petFriendly: {
            type: Boolean,
            required: true,
        },
        feedingRequirements: {
            water: {
                type: String,
                required: true,
            },
            humidity: {
                type: String,
                required: true,
            },
            sun: {
                type: String,
                required: true,
            },
        },
        category: {
            type: [String],
            required: true,
        },
        placement: {
            type: String,
            enum: ['indoor', 'outdoor', 'versatile'],
            required: true,
        }
    },
    {

        timestamps: true,
    }
);

module.exports = model('Product', productSchema);

