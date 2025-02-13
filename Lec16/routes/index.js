const express = require("express");
const todoRoutes = require("./todo.routes");
const router = express.Router();

//router.use("/users", userRoutes);
router.use("/todos", todoRoutes);

module.exports = router;
