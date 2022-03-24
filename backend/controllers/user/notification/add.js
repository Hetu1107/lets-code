const User = require('../../../models/user.model');

exports.addNotification = async (req,res,next)=>{
    try{
        let {value} = req.body;
        let user = await User.findById(req.params.id);
        let length_notifications = await user.notifications.length; // get notifications arrays length
        let mssg = {index : `${req.params.id}-${length_notifications + 1}`,value : value} // writing new object with key index and value
        await User.findByIdAndUpdate(req.params.id,{$addToSet : {notifications : mssg}}); // add mssg to the notifications array
        res.status(200).json({success : true,message : "new notification sended"});
    }catch(e){
        next(e);
    }
}