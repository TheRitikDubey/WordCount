const express  = require('express');
const router  = express.Router();


//Import the  controler

const { getDataFromUrl } = require("../controllers/GetAllData");
const {getAllResults} = require("../controllers/GetDataFromDB");
const {deleteData} = require("../controllers/deleteData");
// const { Createpost,getAllPosts } = require("../Controllers/postControllers");
// const  { likePosts, unlikePosts }  = require("../Controllers/likeController");

//Maping create
// router.get("/postImage", postFun);
router.post("/getImages",getDataFromUrl)
router.get("/get/AllResults", getAllResults)
router.post("/delete/url", deleteData)
// router.post("/post/createPost",Createpost)
// router.get("/getAllPosts", getAllPosts);
// router.post("/likePost",likePosts);
// router.post("/unlikePost",unlikePosts);

//exprot 
module.exports  = router;