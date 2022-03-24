const express = require('express');
const userRouter = express.Router();
// for user routes 
const {register,login} = require("../controllers/auth/user");
const {  getAll } = require('../controllers/user/getAll');
const { getUser } = require('../controllers/user/getUser');

// for notification routes 
const { addNotification } = require('../controllers/user/notification/add');
const { getNotifications } = require('../controllers/user/notification/get');
const { removeNotification } = require('../controllers/user/notification/remove');
const { update } = require('../controllers/user/update');

userRouter.route("/register").post(register); // register user
userRouter.route("/login").post(login); // login user
userRouter.route("/getall/:id").get(getAll); // get all users
userRouter.route("/:id").get(getUser); // get user by its id
userRouter.route("/update/:id").put(update); // update user by its id

// routes for notification for adding and removing 
userRouter.route("/notification/add/:id").put(addNotification); // add notification 
userRouter.route("/notification/remove/:id").put(removeNotification); // remove notification :id = id-index
userRouter.route("/notification/get/:id").get(getNotifications); //get notifications 


module.exports = userRouter;