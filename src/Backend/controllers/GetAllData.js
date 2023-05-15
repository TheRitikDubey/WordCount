//import model
const axios = require("axios");
const cheerio = require("cheerio");
// const url ="https://www.thecodehelp.in/";
const express = require("express");
const WebScrapSchema = require("../Models/WebScrap");
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
      const hrefLinks = [];

    // Extract href links using the 'a' selector
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.substr(0,4) === "http") {
        hrefLinks.push(href);
      }
    });
    
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
    //   const saveComment = await comment.save();
    const favourites=false;
      const currVal =res.json({
        weburl: url,
        wordCount: wordCount,
        payload: imagesData2,
        image2: imagesData1,
        MediaLinks: hrefLinks,
        favourite: favourites,
      });
      const allData = new WebScrapSchema({
        url, wordCount,imagesData1,imagesData2,hrefLinks,favourites
    })
       const saveComment = await allData.save();
    });
  } catch (error) {
    console.log(error);
    return "error occured";
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
