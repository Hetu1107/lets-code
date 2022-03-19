const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

exports.send = async (req,res,next)=>{
    const {id1,id2} = req.body;
    try{
        await User.updateOne({_id : id1},{$addToSet : {recievedRequests : id2}});
        await User.updateOne({_id : id2},{$addToSet : {sendedRequests : id1}});
        res.status(200).json({success : true,message : "friend request sended"});
    }catch(e){
        next(e);
    }
}