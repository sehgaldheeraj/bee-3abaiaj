const express = require("express");
const User = require("./models/user.model");
const app = express();

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
    res.status(200).send({ msg: "Login Successful" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

app.get("/profile", (req, res) => {
  res.send({
    msg: `Welcome${
      req.headers.user.fullname ? req.headers.user.fullname : "User"
    }`,
  });
});

app.listen(3000, () => {
  console.log("Learning Client side storage @ 3000");
});
