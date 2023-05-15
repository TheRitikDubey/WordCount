
const WebScrapSchema = require("../Models/WebScrap");

exports.getAllResults= async(req,res)=> {
    try{
        res.header('Access-Control-Allow-Origin', '*');
        const AllPost = await WebScrapSchema.find();
        res.json({
            payload: AllPost,
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message,
        })
    }
}
