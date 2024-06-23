const express = require("express");
const app = express();
const usermodel = require("../models/userschema");
const mongoose = require("mongoose");
const mydb = require("../configs/mydb");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

const allusers = (req, res) => {
  usermodel
    .find()
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const searchusers = (req, res) => {
  usermodel
    .findById(req.params.id)
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const deleteusers = (req, res) => {
  usermodel
    .deleteOne({ _id: req.params.id })
    .then(() => res.json({ success: true, message: "Data Deleted" }))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const updateusers = (req, res) => {
  const { name, age, city, Class } = req.body;
  usermodel
    .updateOne({ _id: req.params.id }, { $set: { name, age, city ,Class } })
    .then(() =>
      res.json({ success: true, message: "Data Updated Successfully" })
    )
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const addusers = (req, res) => {
  const { name, age, city, Class } = req.body;
  const newuser = new usermodel({
    _id: new mongoose.Types.ObjectId(),
    name,
    age,
    city,
    Class
  });
  newuser
    .save()
    .then(() => res.json({ success: true, message: "Data added" }))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const abs = async (req, res) => {
  try {
    const users = await usermodel.find();
    res.render("dashboard2", { users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  allusers,
  searchusers,
  deleteusers,
  updateusers,
  addusers,
  abs
};
