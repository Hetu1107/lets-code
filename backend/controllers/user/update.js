const User = require('../../models/user.model');


exports.update = async(req,res,next)=>{
    try{
        const {username,email,profileIMG} = req.body;
        await User.findByIdAndUpdate(req.params.id,{username :username,email : email,profileIMG : profileIMG });
        res.status(200).json({success : true,res : "deatils updated"});
    }catch(e){
        next(e);
    }
}