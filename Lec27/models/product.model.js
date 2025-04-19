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

/**
 * CART MODULE:
 * 1. Add to Cart
 * 2. Remove from Cart
 * 3. checkout
 *
 * CART MODEL:
 * let cart = [];
 * addToCart(productId, qty){
 *    cart.push({productId, qty})
 * }
 * console.log(cart);
 * __________________________________
 * cart = [{productId: 12esdw2, qty:4}]
 */
