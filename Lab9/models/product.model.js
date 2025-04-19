const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  desc: String,
  price: { type: Number, required: true },
  qty: { type: Number, default: 0 },
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productsSchema); //products

module.exports = Product;
