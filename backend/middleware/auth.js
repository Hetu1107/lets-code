const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]; // split the header from Bearer
    }
    if(!token){
        return next(new ErrorResponse("Not Authorised to access this route",401)); // if token is not valid
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); // decoding the token 
        const user = await User.findById(decoded._id); 
        if(!user){
            return next(new ErrorResponse("No user find",404)); // if user not found by decoded id
        }
        req.id = user._id;
        next();
    }catch(e){
        return next(new ErrorResponse("Login First",401));
    }
}