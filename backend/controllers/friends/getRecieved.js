const User = require('../../models/user.model');


exports.getRecieved = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        const recieved_array = await user.recievedRequests;
        const notifications = await user.notifications;
        let recieved = await User.find({_id : {$in : recieved_array}});
        res.status(200).json({success : true,recieved,notifications});
    }catch(e){
        console.log(e);
        next(e);
    }
}