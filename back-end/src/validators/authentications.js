const Regx = require("regex");

const validEmailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validPasswordExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

exports.validateSignin = (req, res, next) => {
  const { email, password } = req.body;
  if (checkPassword(password) || checkEmail(email)) {
    return res.status(400).json({
      ...(checkEmail(email) ? { email: "Email is invalid" } : {}),
      ...(checkPassword(password) ? { password: "Password is invalid" } : {}),
    });
  }
  next();
};

exports.validateSignup = (req, res, next) => {
  const { firstname, lastname, email, username, password } = req.body;
  if (
    checkName(firstname) ||
    checkName(lastname) ||
    checkEmail(email) ||
    checkPassword(password) ||
    checkUsername(username)
  ) {
    return res.status(400).json({
      ...(checkName(firstname)
        ? { message: "First name cannot be empty" }
        : {}),
      ...(checkName(lastname) ? { message: "Last name cannot be empty" } : {}),
      ...(checkEmail(email) ? { message: "Email is invalid" } : {}),
      ...(checkPassword(password)
        ? { message: "The password does not match the requirements" }
        : {}),
      ...(checkUsername(username)
        ? { message: "Username does not match the requirements" }
        : {}),
    });
  }
  next();
};

checkEmail = (email) => {
  return !validEmailExpression.test(email);
};

checkPassword = (password) => {
  return !validPasswordExpression.test(password);
};

checkName = (name) => {
  return name.trim() == "";
};

checkUsername = (username) => {
  return !(username.length >= 6);
};
