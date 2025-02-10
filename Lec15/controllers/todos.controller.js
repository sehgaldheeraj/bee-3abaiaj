const Todo = require("../models/todo.model");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.readTodos();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addTodoView = (req, res) => res.render("addTodo");

const addTodo = async (req, res) => {
  try {
    const { name, type, status } = req.body;
    if (!name || !type || !status) {
      return res.status(404).send({ message: "Enter All Details" });
    }
    await Todo.addTodo(name, type, status);
    return res.status(201).redirect("/v1/todos");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const updateTodoView = (req, res) => res.render("updateTodo");
const updateTodo = async (req, res) => {
  const { id, status } = req.body;
  await Todo.updateTodo(id, status);
  res.status(200).redirect("/v1/todos");
};
module.exports = {
  getAllTodos,
  addTodoView,
  addTodo,
  updateTodoView,
  updateTodo,
};
