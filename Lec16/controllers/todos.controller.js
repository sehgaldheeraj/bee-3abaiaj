//const Todo = require("../models/todo.model"); fs based model
const Todo = require("../models/todos.model");

const getAllTodos = async (req, res) => {
  try {
    //const todos = await Todo.readTodos();
    const todos = await Todo.find();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addTodoView = (req, res) => res.render("addTodo");

const addTodo = async (req, res) => {
  try {
    const { name, desc, category, state } = req.body;

    //await Todo.addTodo(name, type, status);
    const newTodo = new Todo({ name, desc, category, state });
    await newTodo.save();
    //await Todo.create({ name, desc, category, state });
    return res.status(201).redirect("/v1/todos");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const updateTodoView = (req, res) => res.render("updateTodo");
const updateTodo = async (req, res) => {
  try {
    const { id, status } = req.body; //4
    //await Todo.updateTodo(id, status);
    await Todo.updateOne({ id: id }, { status: status });
    res.status(200).redirect("/v1/todos");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports = {
  getAllTodos,
  addTodoView,
  addTodo,
  updateTodoView,
  updateTodo,
};
