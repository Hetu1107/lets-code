const User = require('../../../models/user.model');
const Room = require('../../../models/room.model');
exports.removePeople = async(req,res,next)=>{
    const {id1,id2} = req.body;
    try{
        const room = await Room.findByIdAndUpdate(req.params.id,{$pull : {people : id1}});
        const roomID = await room._id;
        const user  = await User.findByIdAndUpdate(id1,{$pull : {rooms : {roomID : roomID}}});
        console.log(user);
        res.status(201).json({success : true,mssg : "user removed"});
    }catch(e){
        next(e);
    }
}