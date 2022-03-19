const express = require('express');
const userRouter = express.Router();
const {register,login} = require("../controllers/auth/user");
const {  getAll } = require('../controllers/user/getAll');
const { getUser } = require('../controllers/user/getUser');
const { update } = require('../controllers/user/update');

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/getall/:id").get(getAll);
userRouter.route("/:id").get(getUser);
userRouter.route("/update/:id").put(update);


module.exports = userRouter;