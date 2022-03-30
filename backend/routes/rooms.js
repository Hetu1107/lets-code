const express = require('express');
const { addFile } = require('../controllers/rooms/file/add');
const { getAllFiles } = require('../controllers/rooms/file/get');
// controllers for rooms
const { addPeople } = require('../controllers/rooms/room/addPeople');
const { createRoom } = require('../controllers/rooms/room/create');
const { getRooms } = require('../controllers/rooms/room/get');
const { removePeople } = require('../controllers/rooms/room/removePeople');
const { runcode } = require('../controllers/runCode/run');

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

// for files 
roomRouter.route("/room/:id").get(getAllFiles); // here id is id of room 
roomRouter.route("/room/create/:id").post(addFile); // here id is the id of room
// roomRouter.route("/room/getfile/:id").get(); // here id is the id of file


// runcode 
roomRouter.route("/room/:id").post(runcode);
module.exports = roomRouter