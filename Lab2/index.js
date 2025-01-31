const express = require("express");
const app = express();

//localhost:3000
app.get("/", (req, res) => {
  res.send("Welcome!");
}); //args - route, cb fn

//localhost:3000/home
app.get("/home", (req, res) => {
  res.send("Hi from Home");
});

app.listen(3000, () => {
  console.log("Serving views via PORT 3000");
});
