exports.returnAuthState = (req,res,next) =>{
    res.status(200).json({
        success : true,
        id : req.id
    })
}