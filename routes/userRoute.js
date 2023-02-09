const express = require("express");
const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", succes: false });
    }

    const passsword = req.body.password;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(passsword, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).send({ message: "user saved successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error saving user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, usertype } = req.body;

  if (usertype === "patient") {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "User not found", success: false });
      }

      if (user.isBlocked) {
        return res.send({
          message: "Your account is blocked, please contact Administrator",
          success: false,
          data: null,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Password is incorrect", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        res.send({ message: "Login successful", success: true, data: token });
      }
    } catch (error) {
      console.log("login error", error);
      res
        .status(500)
        .send({ message: "Error logging In", success: false, error });
    }
  } else if (usertype === "doctor") {
    try {
      const user = await doctorAccountModel.findOne({ email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "Doctor not found", success: false });
      }

      if (user.isBlocked) {
        return res.send({
          message: "Your account is blocked, please contact Administrator",
          success: false,
          data: null,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Password is incorrect", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        res.send({ message: "Login successful", success: true, data: token });
      }
    } catch (error) {
      console.log("login error", error);
      res
        .status(500)
        .send({ message: "Error logging In", success: false, error });
    }
  } else if (usertype === "admin") {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "User not found", success: false });
      }

      if (user.isBlocked) {
        return res.send({
          message: "Your account is blocked, please contact Administrator",
          success: false,
          data: null,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Password is incorrect", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        res.send({ message: "Login successful", success: true, data: token });
      }
    } catch (error) {
      console.log("login error", error);
      res
        .status(500)
        .send({ message: "Error logging In", success: false, error });
    }
  }
});

module.exports = router;
