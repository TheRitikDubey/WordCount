const mongoose = require('mongoose');

//route Handler
const webScrapSchema  = new mongoose.Schema({
    url:{
        type: String,
        require: true,
    },
    wordCount:{
        type: String,
        require: true,
    },
    imagesData1:{
        type: [],
        require: true,
    },
    imagesData2:{
        type: [],
        require: true,
    },
    hrefLinks:{
        type:[],
        require: true,
    },
    favourites:{
        type: Boolean,
        require: true,
    }
})

module.exports = mongoose.model("WebScrapSchema",webScrapSchema)