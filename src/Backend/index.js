const express = require('express');
const app = express();
require("dotenv").config();
// ADD THIS
var cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());

const getData = require("./Routes/getData");

//mount the todo API routes
app.use("/api/v1", getData);
app.listen(PORT,() => {
    console.log(`Server listening on ${PORT}`);
})
app.get('/',(req,res)=>{
    res.send(`<h1> This is Blog pages server</h1>`)
})