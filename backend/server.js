// configure dont env keys 
require('dotenv').config({path : "./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const fetch = require('node-fetch');
globalThis.fetch = fetch;
const atob = require('atob');
globalThis.atob = atob;
// connection with the database 
connectDB();
const errorHandler = require('./middleware/errorHandler');
const app = express();
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}
const PORT = process.env.PORT || 5000;
// middleware to parse json 
app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Hello WOrld")
})
app.use("/api/v1",require('./routes/index'));
// checking for token acceptence 
app.use("/api/private",require('./routes/private'));
// error handler middleware 
app.use(errorHandler);



const File = require('./models/file.model');
async function findFile(id){
    if(id==null) return;
    const file = await File.findById(id);
    return file;
}
const server = app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

const io = require('socket.io')(server,{
    cors:{
        origin : "*",
        methods : ["GET","POST"]
    }
});
io.on("connection",socket=>{
    socket.on('get-document',async fileID => {
        const file = await findFile(fileID);
        socket.join(fileID);
        socket.emit("load-document",file.text);

        socket.on('send-changes',delta=>{
            socket.broadcast.to(fileID).emit('recieved-changes',delta);
        })
        socket.on('save-document',async (data)=>{
            await File.findByIdAndUpdate(fileID,{text : data});
        })
    })
    // console.log("Hey i am listening");
});
// catching the uncout error and closing the server 
process.on("unhandledRejection",(error,promise)=>{
    console.log(error.message);
    server.close(()=>promise.exit(1));
})