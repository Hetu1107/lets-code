const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

exports.reject = async (req,res,next)=>{
    const {id1,id2} = req.body;
    try{
        await User.updateOne({_id : id1},{$pull : {recievedRequests : id2}});
        await User.updateOne({_id : id2},{$pull : {sendedRequests : id1}});
        res.status(200).json({success : true,message : "request rejected"});
    }catch(e){
        next(e);
    }
}