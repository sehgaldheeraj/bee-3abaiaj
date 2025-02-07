const express = require("express");
const methodOverride = require("method-override");
const routes = require("./routes/index");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/v1", routes);

//Major update - PUT Request

app.listen(3000, () => {
  console.log("learning RESTful CRUD operations at 3000");
});
