const e = require("express");

const jwt = require("jsonwebtoken");
const env = require("dotenv");
exports.RequireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = user;
    next();
  } else {
    res.status(400).json({
      message: "Authorization Required",
    });
  }
};
