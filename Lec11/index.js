const express = require("express");
const Todo = require("./models/todo.model");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/**
 * TASK1: GET all todos
 */

app.get("/", async (req, res) => {
  try {
    const todos = await Todo.readTodos();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * TASK2: add todo view
 */
app.get("/addTodo", (req, res) => res.render("addTodo"));

/**
 * TASK3: adds todo at backend
 */
app.post("/todo", async (req, res) => {
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
