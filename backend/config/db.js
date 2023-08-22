const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log('database connected');
    }catch(e){
        console.log(`error : ${e.message}`);
        return new Error('database connection failed');
    }
}

module.exports = connectDB;