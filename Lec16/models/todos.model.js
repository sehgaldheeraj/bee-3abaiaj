const mongoose = require("mongoose");
const todosSchema = mongoose.Schema({
  NamedNodeMap: { type: String, required: true },
  desc: String,
  category: { type: String, default: "others" },
  state: { type: String, default: "pending" },
  time: { type: Date, default: Date.now },
});

userSchema.pre("updateOne", function (next) {
  this.desc = "running";
  next();
});
userSchema.post("save", function (next) {
  console.log("Todo created successfully");
  next();
});
const Todo = mongoose.model("Todo", todosSchema);
module.exports = Todo;
