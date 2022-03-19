const User = require('../../models/user.model');
exports.getFriends = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        const friends_id = await user.friends;
        const sended = await user.sendedRequests;
        const friends = await User.find({'_id' : {$in : friends_id}});
        const user_rooms = await user.rooms;
        res.status(200).json({success : true,friends,user_rooms,sended});
    }catch(e){
        next(e);
    }
}