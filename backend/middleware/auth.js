const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new ErrorResponse("Not Authorised to access this route",401));
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(token);
        const user = await User.findById(decoded._id);
        if(!user){
            return next(new ErrorResponse("No user find",404));
        }
        req.user = user;
        next();
    }catch(e){
        return next(new ErrorResponse("Login First",401));
    }
}