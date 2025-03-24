const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("mongo-connect");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const passport = require("./authentication/passport");
const app = express();
const URI = "mongodb://localhost:27017/EcomABAIAJ";

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

//User Registration
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds
    await User.create({ username, email, password: hashedPassword, role });
    return res.status(201).send({ msg: "User registered" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

//User Login
app.post("/login", async (req, res) => {
  // const { email, password } = req.body;
  // try {
  //   const user = await User.findOne({ email: email });
  //   if (!user) {
  //     return res.status(404).send({ msg: "Account not found" });
  //   }
  //   const match = await bcrypt.compare(password, user.password);
  //   if (!match) {
  //     return res.status(401).send({ msg: "Invalid credentials" });
  //   }
  //   req.session.user = user;
  //   //This will map your user data with uniquely generated sessionId
  //   //and will send this sessionId inside a cookie to the client
  //   //res.cookie("userIdCard", user);
  //   res.status(200).send({ msg: "Login Successful" });
  // } catch (err) {
  //   res.status(500).send({ msg: err.message });
  // }
  passport.authenticate("local");
  //passport.authenticate("google");
});

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    //req.isAuthenticated();
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
