const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  Class: { type: Number, required: true },
});

module.exports = mongoose.model("students", userSchema);
