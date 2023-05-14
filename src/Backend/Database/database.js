const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlparser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB is successfully Connected");
    })
    .catch((err)  => {
        console.log("DB connection error: " + err.message);
        //What is this??
        process.exit(1);
    })
}
module.exports = dbConnect;