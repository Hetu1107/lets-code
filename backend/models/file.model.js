const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename : {
        type : String,
        unique : true,
        required : [true,"please provide filename"]
    },
    text : {
        type : Object
    },
})
const file = mongoose.model("files",fileSchema);
module.exports = file;