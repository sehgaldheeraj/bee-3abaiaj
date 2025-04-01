const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("../authentication/passport");
router.post("/register", async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.render("login");
    }
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds
    await User.create({ fullname, email, password: hashedPassword, role });
    return res.status(201).send({ msg: "User registered" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

//User Login
router.post("/login", async (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  });
});

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    //req.isAuthenticated();
    return res.status(403).send({ msg: "Unauthorized, please login" });
  }
  next();
}

//protected resource
router.get("/profile", isAuthenticated, (req, res) => {
  res.send({
    msg: `Welcome${
      req.headers.user.fullname ? req.headers.user.fullname : "User"
    }`,
  });
});

module.exports = router;
