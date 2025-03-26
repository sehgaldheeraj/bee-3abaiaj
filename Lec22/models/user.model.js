const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, required: true, unique: true },
  phone: { type: Number, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "buyer" },
});

userSchema.methods.verifyPassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
