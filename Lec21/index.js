const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("mongo-connect");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const passport = require("./authentication/passport");
const routes = require("./routes/index");
const app = express();
const URI = "mongodb://localhost:27017/EcomABAIAJ";

app.set("view engine", "ejs");
app.use(express.json());

app.use(
  session({
    //session Ids will be created using this secret
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000, httpOnly: true, secure: false },
    store: MongoStore.create({ mongoUrl: URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
