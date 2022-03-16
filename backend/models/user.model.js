const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide username"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 8,
    select: false,
  },
  profileIMG: {
    type: Number,
  },
  friends: [
  ],
  rooms: [
  ],
  sendedRequests: [
  ],
  notifications : [
  ],
  recievedRequests: [
  ],
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
userSchema.methods.matchPassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};

const user = mongoose.model("user", userSchema);
module.exports = user;
