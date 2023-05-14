const mongoose = require('mongoose');

//route Handler
const webScrapSchema  = new mongoose.Schema({
    body:  {
        type: String,
        require: true,
    },
    images:{
        type: String,
        require: true,
    },
    videos:{
        type: String,
        require: true,
    }
})

module.exports = mongoose.model("WebScrapSchema",webScrapSchema)