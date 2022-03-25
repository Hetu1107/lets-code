const Room = require('../models/room.model');
const ErrorResponse = require('../utils/errorResponse');
exports.access = async (req,res,next)=>{
    const {id1,id2} = req.body; // id1 = id of user that u want to add id2 = your id
    try{
        const room = await Room.findById(req.params.id);
        const owner_id = await room.ownerid;
        if(owner_id === id2){
             next();
        }
        else{
            return next(new ErrorResponse("you are not allowed to do this",401))
        }
    }catch(e){
        return next(e);
    }
}