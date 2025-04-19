const router = require("express").Router();
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
module.exports = router;
