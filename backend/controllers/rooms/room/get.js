const User = require("../../../models/user.model");
const Room = require("../../../models/room.model");

exports.getRooms = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const rooms = await user.rooms;
    // changes needed
    const user_rooms = await Room.find({'_id' : {$in : rooms[i].roomID}});
    res.status(200).json({success : true,rooms : user_rooms});
  } catch (e) {next(e)}
};
