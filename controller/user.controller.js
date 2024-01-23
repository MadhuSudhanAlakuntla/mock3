const express = require("express");
const { UserModel } = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {
    return res.json({ status: "User already exist Please Login" });
  }
  try {
    bcrypt.hash(password, 8, async function (err, hash) {
      if (err) {
        return res.json({ status: "User not Created" });
      }
      const user = await UserModel.create({
        name: name,
        email: email,
        password: hash,
      });
      res.json({ status: "User Signup SuccessFully", newUser: name });
    });
  } catch (err) {
    console.log(err);
  }
});

userController.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  
  const hashed_password = user.password;
  try {
    bcrypt.compare(password, hashed_password, async function (err, result) {
      if (err || !result) {
        return json({ status: "User not Logged in" });
      }
      const secretKey = 12345;
      const token = jwt.sign({ userId: user._id }, "secretKey");
      res.json({
        status: "User Logged in SuccessFully",
        userIs: name,
        token: token,
      });
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = { userController };
