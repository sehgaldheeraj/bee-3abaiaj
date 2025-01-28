const fs = require("fs/promises");
const path = require("path");
//'./models/todo.model.js'
const todosDB = path.join(__dirname, "todos.json");
/**
 * fs/promises
 * fs.readFile(pathToFile :string)  : fs.readFileSync()
 * fs.writeFile(pathToFile :string, data)   :  fs.writeFileSync()
 *
 * fs
 *  fs.readFile(pathToFile :string, (err, data)=>{})  : fs.readFileSync()
 *  fs.writeFile(pathToFile :string, data, (err, data)=>{})   :  fs.writeFileSync()
 */

class Todo {
  static addTodo = (name, type, status) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fs.readFile(todosDB);
        const todos = JSON.parse(data);
        const newTodo = {
          id: todos.length + 1,
          name: name,
          type: type,
          status: status,
        };
        todos.push(newTodo);
        await fs.writeFile(todosDB, JSON.stringify(todos));
        //await fs.appendFile(todosDB, newTodo);
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  static readTodos = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fs.readFile(todosDB);
        const todos = JSON.parse(data);
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
}
module.exports = Todo;
