const express = require("express");
const app = express();

app.use(express.json()); //app level middleware

function guardMiddleware(req, res, next) {
  //route level middleware
  const idCard = req.body;
  if (idCard.uniRollNo !== false) {
    return res.status(401).send({ msg: "Invalid uni roll no" });
  } else {
    next();
  }
}

app.post("/classroomABAIAJ", guardMiddleware, (req, res) => {
  res.status(200).send({ msg: "Entry granted" });
});

app.post("/classroomAE", guardMiddleware, (req, res) => {
  res.status(200).send({ msg: "Entry granted" });
});
app.post("/eventXYZ", (req, res) => {
  res.status(200).send({ msg: "Entry granted to event" });
});
function checkAuth(req, res, next) {
  const { isLoggedIn } = req.body;
  if (!isLoggedIn) {
    return res.send({
      message: "You are not authorized to access this resource",
    });
  } else {
    console.log("In authentication middleware");
    next();
  }
}

//protected resourse
app.post("/", checkAuth, (req, res) => {
  const { isLoggedIn, username } = req.body;
  console.log("In auth controller");
  //CRUD operation
  res.send({ message: `${username} has joined` });
});

//10 such APIs
// app.get("/", cont1);
// app.get("/2",checkAuth, cont2);
// app.get("/3", checkAuth,m2, cont3);
// app.get("/4", cont4);
app.listen(3000, () => {
  console.log("Learning middlewares @ 3000");
});
