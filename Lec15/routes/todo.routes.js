const router = require("express").Router();
const {
  getAllTodos,
  addTodoView,
  addTodo,
  updateTodoView,
  updateTodo,
} = require("../controllers/todos.controller");
/**
 * TASK1: GET all todos
 */
router.get("/", getAllTodos);
/**
 * TASK2: add todo view
 */
router.get("/addTodo", addTodoView);
/**
 * TASK3: adds todo at backend
 */
router.post("/", addTodo);

router.get("/updateTodo", updateTodoView);
//Minor update - PATCH Request
router.patch("/", updateTodo);

module.exports = router;
/**
 * 200 - 299 -> Success codes
 * 300 - 399 -> General purpose codes
 * 400 - 499 -> Client side error
 * 500 - beyond -> Server side error
 */