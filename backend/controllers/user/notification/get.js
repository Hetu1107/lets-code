const User = require('../../../models/user.model');

exports.getNotifications = async (req,res,next)=>{
    try{
        let user = await User.findById(req.params.id);
        let notifications = await user.notifications; //geting notification array 
        res.status(200).json({success : true,notifications});
    }catch(e){
        next(e);
    }
}