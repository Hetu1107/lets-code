const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomname : {
        type: String,
        unique : true,
        required: [true, "please provide roomname"],
    },
    ownerid : {
        type : String
    },
    owner : {
        type : String
    },
    people : [

    ],
    files : [
        
    ]
});

const room = mongoose.model("rooms",roomSchema);

module.exports = room