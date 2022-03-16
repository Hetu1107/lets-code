const User = require("../../models/user.model");

exports.remove = async (req,res,next)=>{
    const {id1,id2} = req.body;
    try{
        await User.updateOne({_id : id1},{$pull : {friends : id2}});
        await User.updateOne({_id : id2},{$pull : {friends : id1}});
        res.status(200).json({success : true,message : "removed from friends"});
    }catch(e){
        next(e);
    }
}