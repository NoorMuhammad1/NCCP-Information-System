const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "internal", "external"],
      default: "external",
    },
    description: {
      type: String,
      max: 500,
      default: "NULL",
    },
    contactNumber: { type: String, default: "NULL" },
    profilePicture: { type: String, default: "NULL" },
    add_M_Permission: { type: Boolean, default: false },
    view_M_Permission: { type: Boolean, default: true },
    delete_M_Permission: { type: Boolean, default: false },
    update_M_Permission: { type: Boolean, default: false },
  },
  { timestamp: true }
);

//Virtual password hashing method
userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};
module.exports = mongoose.model("User", userSchema);
