const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    name: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      min: 6
    },
    avatarUrl: {
      type: String,
      default: "https://res.cloudinary.com/ddezxiyvb/image/upload/v1695907857/aunties-planties/defaultAvatar.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    },
    favourites: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },

    cart: [
      {
        _id: false,
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        // productTotal: {
        //   type: Number,
        //   default: 0
        // }
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);