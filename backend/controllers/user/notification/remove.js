const User = require('../../../models/user.model');

exports.removeNotification = async (req,res,next)=>{
    try{
        let [id,index] = req.params.id.split("-",2); // split params.id in two parts id and its index
        await User.findByIdAndUpdate(id,{$pull : {notifications : {index : req.params.id}}}); // pull from notifications with index = params.id
        res.status(200).json({success : true,message : "notification removed"});
    }catch(e){
        next(e);
    }
}