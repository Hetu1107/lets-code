const Room = require('../../../models/room.model');
const User = require('../../../models/user.model');
exports.createRoom = async (req,res,next)=>{
    const {roomname} = req.body;
    const ownerid = req.params.id;
    try{
        const user = await User.findById(ownerid);
        const owner = await user.username;
        const room = await Room.create({
            roomname,
            owner,
            ownerid
        });
        await Room.findByIdAndUpdate(await room._id,{$addToSet : {people : ownerid}});
        const roomID = await room._id;
        await User.findByIdAndUpdate(req.params.id,{$addToSet : {rooms : {roomID,roomname,owner}}});
        res.status(200).json({success : true,detail : {roomID,roomname,owner}})
    }catch(e){
        next(e);
    }
}