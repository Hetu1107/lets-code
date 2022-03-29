const File = require('../../../models/file.model');
const Room = require('../../../models/room.model');
const User = require('../../../models/user.model');
exports.getAllFiles = async (req,res,next)=>{
    const id = req.params.id; // room id
    try{
        const room = await Room.findById(id);
        const files = await room.files;
        const users = await room.people;
        const filesData = await File.find({'_id' : {$in : files}});
        const people = await User.find({'_id' : {$in : users}});
        res.status(200).json({success : true,filesData,people});
    }catch(e){
        next(e);
    }
}