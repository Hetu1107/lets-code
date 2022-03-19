const User = require('../../models/user.model');

exports.getAll = async (req,res,next)=>{
    try{
        let all = await User.find({"_id": {$ne : req.params.id}});
        res.status(200).json({success : true,all})
    }catch(e){
        next(e);
    }
}