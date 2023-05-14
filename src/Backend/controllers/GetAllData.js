//import model
const axios = require("axios");
const cheerio = require("cheerio");
// const url ="https://www.thecodehelp.in/";
const express = require("express");
const app = express();
//bussiness logic
async function getImage(url, res) {
  let ans = [];
  try {
    await axios.get(url).then(async (response) => {
      const data = response.data;
      // console.log(data);
      const $ = await cheerio.load(data);
      const text = $("body").text();
      const wordCount = text.trim().split(/\s+/).length; // word count stored;
      const mediaElements = $("audio, video, source");
      const anchorTags = $("a").attr('href');

      // Extract the href attribute from anchor tags
    //   const webLinks = anchorTags
    //     .map((index, element) => $(element).attr("href"))
    //     .get();

      console.log("Web Links:", anchorTags);
      let imagesData1 = [];

      let imagesData2 = [];
      $("img").each((index, img) => {
        const currImage1 = $(img).attr("src");
        const currImage2 = $(img).attr("srcset");
        if (currImage1 !== undefined) {
          imagesData1.push(currImage1);
        }
        if (currImage2 !== undefined) {
          imagesData2.push(currImage2.split(","));
        }
      });
      res.json({
        weburl: url,
        wordCount: wordCount,
        payload: imagesData2,
        image2: imagesData1,
        favourite: true,
      });
      return wordCount; // this return as undefined
    });
  } catch (error) {
    console.log(error);
    return "this is it";
  }
}

exports.getDataFromUrl = async (req, res) => {
  try {
    const { url } = req.body; // we get the url;
    //create a  comment  object
    const allimages = await getImage(url, res);
    console.log("this is is=>", allimages); // this prints undefined
    // const  comment  = new Comment({
    //     url

    // })
    // const saveComment = await comment.save();

    //find  the  pos using Id  and  the  new comment will be added to the comment of array.
    // const  updatePost  = await Post.findByIdAndUpdate(post,{$push:{comment:saveComment._id}}, {new:true})
    //         .populate("comment").exec(); //populate the comment array   with comment  document\
    // res.json({
    //     payload:  allimages,
    // })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
