const router = require("express").Router();
const Product = require("../models/product.model");
/**
 * TASK1: GET '/v1/products/new'
 *        Produce a form that will take product details from user
 */
/**
 * TASK2: POST 'v1/products'
 *        Add Product Data to Db
 */
router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
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
    return res.render("products", { products: products });
  } catch (err) {
    res.status(500).send({ msg: "ISE", err: err.message });
  }
});
/**
 * TASK4: GET 'v1/products/:id'
 *        Fetch product by its ID
 */
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("product", { product });
  } catch (err) {
    res.status(500).send({ msg: "ISE", err: err.message });
  }
});
/**
 * TASK5:
 * TASK6:
 * TASk&:
 */

module.exports = router;
