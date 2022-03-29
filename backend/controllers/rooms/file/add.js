const File = require('../../../models/file.model');
const Room = require('../../../models/room.model');

exports.addFile = async (req,res,next)=>{
    const {filename,text} = req.body;
    const roomID = req.params.id;
    try{
        const file = await File.create({
            filename,
            text
        })
        const fileId = await file._id;
        await Room.findByIdAndUpdate(roomID,{$addToSet : {files : fileId}});
        res.status(201).json({success : true,file});
    }catch(e){
        next(e);
    }
}