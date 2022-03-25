const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename : {
        type : String,
        required : [true,"please provide filename"]
    },
    data : {
        type : Object
    }
})
const file = mongoose.model("files",fileSchema);
module.exports = fileSchema;