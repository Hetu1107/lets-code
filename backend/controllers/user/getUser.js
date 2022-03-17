const User = require("../../models/user.model");
exports.getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({success : true,user});
    }catch(e){
        next(e);
    }
}