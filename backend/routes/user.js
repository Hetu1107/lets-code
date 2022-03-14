const express = require('express');
const userRouter = express.Router();

userRouter.route("/register").post();
userRouter.route("/login").post();

module.exports = userRouter;