const express = require('express');
const { accept } = require('../controllers/friends/accept');
const { reject } = require('../controllers/friends/reject');
const { send } = require('../controllers/friends/send');
const { remove } = require('../models/user.model');
const {getFriends} = require('../controllers/friends/getFriends');
const { getRecieved } = require('../controllers/friends/getRecieved');
const friendsRoute = express.Router();

friendsRoute.route("/getfriends/:id").get(getFriends); // sending friend req api 
friendsRoute.route("/send").put(send); // remove friend api 
friendsRoute.route("/remove-friend").put(remove); // accept friend request
friendsRoute.route("/accept").put(accept); // reject friend request 
friendsRoute.route("/reject").put(reject); // get all recieved friends req data 
friendsRoute.route("/recieved/:id").get(getRecieved);


module.exports = friendsRoute;