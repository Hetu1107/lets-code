const express = require('express');
// controllers for rooms
const { addPeople } = require('../controllers/rooms/room/addPeople');
const { createRoom } = require('../controllers/rooms/room/create');
const { getRooms } = require('../controllers/rooms/room/get');
const { removePeople } = require('../controllers/rooms/room/removePeople');

// middlewares
const { access } = require('../middleware/access');
const { protect } = require('../middleware/auth');
// room router 
const roomRouter = express.Router();

// for rooms 
roomRouter.route("/getrooms/:id").get(protect,getRooms); // get all rooms in user 
roomRouter.route("/create/:id").post(protect,createRoom); //create room
roomRouter.route("/addpeople/:id").put(access,addPeople); // add user to the room
roomRouter.route("/removepeople/:id").put(access,removePeople); // remove user from the room
module.exports = roomRouter