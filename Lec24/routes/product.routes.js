const router = require("express").Router();
const { Router } = require("express");
const Product = require("../models/product.model");
/**
 * TASK1: GET '/v1/products/new'
 *        Produce a form that will take product details from user
 */
router.get("/new", (req, res) => res.render("addProduct"));
/**
 * TASK2: POST 'v1/products'
 *        Add Product Data to Db
 */
router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    console.log(newProduct);
    await Product.create(newProduct);
    res.redirect("/v1/products");
  } catch (err) {
    res.status(500).send({ msg: "ISE", err: err.message });
  }
});
/**
 * TASK3: GET  'v1/products'
 *        Fetch all the products in DB
 *        if query is present, then fetch queried products
 */
router.get("/", async (req, res) => {
  const { query } = req.query;
  try {
    if (query) {
      const queriedProducts = await Product.find({ name: query });
      return res.render("products", { products: queriedProducts });
    }
    const products = await Product.find();
    console.log(products);
    return res.render("products", { products: products });
  } catch (err) {
    res.status(500).send({ msg: "ISE", err: err.message });
  }
});
/**
 * TASK4: GET 'v1/products/:id'
 *        Fetch product by its ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("product", { product, id });
  } catch (err) {
    res.status(500).send({ msg: "ISE", err: err.message });
  }
});
/**
 * TASK5: GET a form that updates product data
 */
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  res.render("updateProduct", { id });
});
/**
 * TASK6: UPDATE Product Data
 */
/**
 * TASk7: DELETE Product Data
 */

module.exports = router;
