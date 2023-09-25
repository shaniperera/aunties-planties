const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    userName: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      min: 5
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    },
    favourites: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);