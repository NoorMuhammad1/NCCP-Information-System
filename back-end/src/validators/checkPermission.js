const { compareSync } = require("bcrypt");
const e = require("express");
const user = require("../models/user");
const User = require("../models/user");
exports.checkPermission = (permission) => {
  return async (req, res, next) => {
    await User.findById(req.user._id, (error, user) => {
      if (error) {
        res.status(400).json({
          error: error,
        });
      }
      if (user) {
        if (hasPermission(user, permission)) {
          return res.status(400).json({
            message: "This user does not have the permission for this.",
          });
        }
        next();
      } else {
        res.status(400).json({
          message: "No such user exists in the system",
        });
      }
    });
  };
};

hasPermission = (user, permission) => {
  switch (permission) {
    case "addMicroorganism":
      return !user.add_M_Permission;
      break;
    case "viewMicroorganism":
      return !user.view_M_Permission;
      break;
    case "deleteMicroorganism":
      return !user.delete_M_Permission;
      break;
    case "updateMicroorganism":
      return !user.update_M_Permission;
      break;
    default:
      return false;
      break;
  }
};
