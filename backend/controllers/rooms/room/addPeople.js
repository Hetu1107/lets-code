const Room = require('../../../models/room.model');
const User = require('../../../models/user.model');
exports.addPeople = async (req,res,next) =>{
    const {id1,id2} = req.body; // id1 = id of user that u want to add id2 = your id
    try{
        const room = await Room.findByIdAndUpdate(req.params.id,{$addToSet : {people : id1}});
        const roomID = await room._id;
        const owner = await room.owner;
        const roomname = await room.roomname;
        await User.findByIdAndUpdate(id1,{$addToSet : {rooms : {roomID,owner,roomname}}});
        res.status(201).json({success : true,mssg : "user added"});
    }catch(e){
        next(e);
    }
}