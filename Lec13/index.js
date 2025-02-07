const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Todo = require("./models/todo.model");
const app = express();
const URI = ""; //connection string entered
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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
//Minor update - PATCH Request
app.patch("/todos/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await Todo.updateTodo(id, status);
  res.status(200).send({ message: "status updated successfully" });
});

//Major update - PUT Request
async function connect() {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log("connection failed due to: ", err.message);
  }
}
connect();
app.listen(3000, () => {
  console.log("learning RESTful CRUD operations at 3000");
});
