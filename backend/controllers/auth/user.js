const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

exports.register = async (req,res,next)=>{
    const {username,email,password} = req.body;
    try{
        const user = await User.create({
            username,
            email,
            password
        });
        sendToken(user,201,res);
    }catch(err){
        next(err);
    }
}
exports.login = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorResponse("please provide email and password",400));
    }
    try{
        const user = await User.findOne({email : email}).select("password");
        if(!user){
            return next(new ErrorResponse("Invalid credentials",404));
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid credentials",404));
        }
        sendToken(user,200,res);
    }catch(err){
        next(err);
    }
};




const sendToken = (user,statusCode,res) =>{
    const token = user.getSignedToken();
    res.status(statusCode).json({success : true,token : token});
}