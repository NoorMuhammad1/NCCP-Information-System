const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(404).json({
        message: "User with the same email already exists",
      });

    const {
      firstname,
      lastname,
      email,
      password,
      description,
      username,
      role,
      add_M_permission,
    } = req.body;
    const _user = new User({
      firstname,
      lastname,
      email,
      password,
      description,
      username,
      role,
      add_M_permission,
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(200).json({
          message: "User created successfully",
        });
      }
    });
  });
};

exports.signin = async (req, res) => {
  await User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      res.status(400).json({
        message: error,
      });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN, {
          expiresIn: "1h",
        });
        const { _id, firstname, lastname, email, fullname, role } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstname,
            lastname,
            email,
            role,
            fullname,
          },
        });
      } else {
        res.status(400).json({
          message: "Wrong email or password",
        });
      }
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  });
};

exports.requireSignin = (req, res, next) => {
  req.user = jwt.verify(req.headers.token, process.env.SECRET_TOKEN);
  next();
};
