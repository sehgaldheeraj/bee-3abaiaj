const express = require("express");
const Todo = require("./models/todo.model");
const app = express();

/**
 * TASK1: GET all todos
 */

/**
 * TASK2: add todo view
 */

/**
 * TASK3: adds todo at backend
 */
app.post("/todos", async (req, res) => {
  try {
    const { name, type, status } = req.body;
    if (!name || !type || !status) {
      return res.status(404).send({ message: "Enter All Details" });
    }
    await Todo.addTodo(name, type, status);
    return res.status(201).send({ message: "Todo added successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
/**
 * 200 - 299 -> Success codes
 * 300 - 399 -> General purpose codes
 * 400 - 499 -> Client side error
 * 500 - beyond -> Server side error
 */
app.listen(3000, () => {
  console.log("learning RESTful CRUD operations at 3000");
});
