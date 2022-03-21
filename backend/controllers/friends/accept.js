const User = require("../../models/user.model");

exports.accept = async (req,res,next)=>{
    const {id1,id2} = req.body;
    try{
        await User.updateOne({_id : id1},{$addToSet : {friends : id2}});
        await User.updateOne({_id : id2},{$addToSet : {friends : id1}});
        await User.updateOne({_id : id1},{$pull : {recievedRequests : id2}});
        await User.updateOne({_id : id2},{$pull : {sendedRequests : id1}});
        res.status(200).json({success : true,message : "added to friends"});
    }catch(e){

    }
}