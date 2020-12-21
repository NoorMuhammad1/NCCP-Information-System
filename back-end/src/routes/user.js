const express = require("express");
const { signup, signin } = require("../controller/autheticate");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const env = require("dotenv");
const {
  validateSignin,
  validateSignup,
} = require("../validators/authentications");

router.post("/signin", validateSignin, signin);
router.post("/signup", validateSignup, signup);

module.exports = router;
