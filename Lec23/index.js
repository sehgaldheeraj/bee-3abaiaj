const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
//const MongoStore = require("mongo-connect");
const memoryStore = require("memorystore")(session);
const passport = require("./authentication/passport");
const routes = require("./routes/index");
const app = express();
const URI = "mongodb://localhost:27017/EcomABAIAJ";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(
  session({
    //session Ids will be created using this secret
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000, httpOnly: true, secure: false },
    store: new memoryStore({ checkPeriod: 86400000 }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
app.get("/products", (req, res) => res.render("addProduct"));

app.get("/home", (req, res) => res.render("home"));
app.use("/v1", routes);
//User Registration

async function connectDB() {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err.message);
  }
}
connectDB();
app.listen(3000, () => {
  console.log("Learning Client side storage @ 3000");
});
