const router = require("express").Router();

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

module.exports = router;
