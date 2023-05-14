const axios = require('axios');
const cheerio  = require('cheerio');
const url ="https://discord.com/";
const express = require('express');
const app = express();

function getAlldata() {
    try {
        axios.get(url).then((response)  =>{
            const data = response.data;
            // console.log(data);
            const $  = cheerio.load(data);
            const title = $('meta[name=description]').attr('content');;
            const text = $('body').text();
            const wordCount = text.trim().split(/\s+/).length;
            
            
            console.log('====================================');
            console.log(wordCount);
            console.log('====================================');
            const imagesData=[];
            $('img').each((index,img) =>{
                const currImage1 = $(img).attr('src');
                const currImage2 = $(img).attr('srcset');
                if(currImage1 !== undefined){
                    
                imagesData.push(currImage1)
                }
                if(currImage2 !== undefined){
                    
                imagesData.push(currImage2.split(','));
                }
            })
            const AllImages = imagesData.filter(curr => curr !== undefined);
            // let  cnt=0;
            // AllImages.forEach(img =>{
            //     let len  = img.length;
            //     cnt=cnt+len;
            // })
            // console.log("Length", cnt);
        })
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}
getAlldata();
