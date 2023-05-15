const WebScrapSchema = require("../Models/WebScrap");

exports.deleteData= async(req,res)=> {
    try{
        const url = req.body
        const allData = await WebScrapSchema.findOneAndDelete(url);
        res.status(500).json({
            status: "sucess",
        })    
    }
    catch(err){
        res.status(500).json({
            error: err.message,
        })
    }
}
