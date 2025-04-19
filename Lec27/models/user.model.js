const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  qty: { type: Number, default: 0 },
});
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, required: true, unique: true },
  phone: { type: Number, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "buyer" },
  cart: [cartSchema],
  totalPrice: { type: Number, default: 0 },
});

userSchema.methods.verifyPassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
