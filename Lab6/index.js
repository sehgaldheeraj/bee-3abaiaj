const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const app = express();
const URI = "mongodb://localhost:27017/todosDB";
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/v1", routes);

connection()
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((err) => console.log(err.message));
async function connection() {
  await mongoose.connect(URI);
}
app.listen(3000, () => {
  console.log("learning RESTful CRUD operations at 3000");
});
