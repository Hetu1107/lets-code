const Room = require('../../../models/room.model');
const User = require('../../../models/user.model');
exports.createRoom = async (req,res,next)=>{
    const {roomname,owner} = req.body;
    const ownerid = req.params.id;
    try{
        const room = await Room.create({
            roomname,
            owner,
            ownerid
        });
        const roomID = await room._id;
        await User.findByIdAndUpdate(req.params.id,{$addToSet : {rooms : roomID}});
        res.status(200).json({success : true})
    }catch(e){
        next(e);
    }
}