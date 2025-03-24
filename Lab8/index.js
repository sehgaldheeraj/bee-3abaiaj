const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const app = express();
const URI = "mongodb://localhost:27017/EcomABAIAJ";

app.use(express.json());

//User Registration
app.post("/register", async (req, res) => {
  const newUser = req.body;
  try {
    await User.create(newUser);
    return res.status(201).send({ msg: "User registered" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

//User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ msg: "Account not found" });
    }
    if (password != user.password) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    res.cookie("userIdCard", user);
    res.status(200).send({ msg: "Login Successful" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

function isAuthenticated(req, res, next) {
  if (!req.headers.user) {
    return res.status(403).send({ msg: "Unauthorized, please login" });
  }
  next();
}

//protected resource
app.get("/profile", isAuthenticated, (req, res) => {
  res.send({
    msg: `Welcome${
      req.headers.user.fullname ? req.headers.user.fullname : "User"
    }`,
  });
});

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
