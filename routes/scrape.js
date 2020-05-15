const express = require ('express');
const cheerio = require ('cheerio');
const rp = require ('request-promise');
const router= express.Router();
const db = require ('../models');
const axios= require ('axios');

router.get("/newArticles", function(req,res) {
  const options = { uri: 'https://www.nytimes.com/section/us', transform: function (body){ return cheerio.load(body)}};

      db.Article
      .find({})
      .then((savedArticles) => {
        //creating an array of saved article headlines
        let savedHeadlines = savedArticles.map(article => article.headline)
  
          //calling request promist with options object
          rp(options)
          .then(function ($) {
            let newArticleArr = [];
            //iterating over returned articles, and creating a newArticle object from the data
            $('#div.app').each((i, element) => {
              let newArticle = new db.Article({
                storyUrl: $(element).find('.story-body>.story-link').attr('href'),
                headline: $(element).find('h2.headline').text().trim(),
                summary : $(element).find('p.summary').text().trim(),
                imgUrl  : $(element).find('img').attr('src'),
                byLine  : $(element).find('p.byline').text().trim()
              });
              //checking to make sure newArticle contains a storyUrl
              if (newArticle.storyUrl) {
                //checking if new article matches any saved article, if not add it to array
                //of new articles
                if (!savedHeadlines.includes(newArticle.headline)) {
                  newArticleArr.push(newArticle);
                }
              }
            });//end of each function
  
            //adding all new articles to database
            db.Article
              .create(newArticleArr)
              .then(result => res.json({count: newArticleArr.length}))//returning count of new articles to front end
              .catch(err => {});
          })
          .catch(err => console.log(err))//end of rp method
      })
      .catch(err => console.log(err))//end of db.Article.find()
  
  });// end of get request to /scrape//


module.exports = router;


//         ****let headline = $(element).children().find("h2").text().trim();
//         let link = $(element).find("a").attr("href");
//         let imgUrl= 
//         if (link) link = link.trim();
//         let summary = $(element).find("ul").find("li").text().trim();
//         if (summary) {
//             results.push({
//                 headline: headline,
//                 link: "https://www.nytimes.com/" + link,
//                 summary: summary,
//                 type: "nyt"
//             });
//         }
//     });

//     db.Article.create(results)
//         .then(results => {
//             res.status(200).json(results);
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// }).catch(error => {
//     console.log(error);
//     res.status(500).json(error);
// });
// });

 
 
        // db.Article
        // .find({})
        // .then((savedArticles) => {
        //   //creating an array of saved article headlines
        //   let savedHeadlines = savedArticles.map(article => article.headline)
    
        //     //calling request promist with options object
        //     rp(options)
        //     .then(function ($) {
        //       let newArticleArr = [];
        //       //iterating over returned articles, and creating a newArticle object from the data
        //       $('#article').each((i, element) => {
        //         let newArticle = new db.Article({
        //           storyUrl: $(element).find('.story-body>.story-link').attr('href'),
        //           headline: $(element).find('h2.headline').text().trim(),
        //           summary : $(element).find('p.summary').text().trim(),
        //           imgUrl  : $(element).find('img').attr('src'),
        //           byLine  : $(element).find('p.byline').text().trim()
        //         });
        //         //checking to make sure newArticle contains a storyUrl
        //         if (newArticle.storyUrl) {
        //           //checking if new article matches any saved article, if not add it to array
        //           //of new articles
        //           if (!savedHeadlines.includes(newArticle.headline)) {
        //             newArticleArr.push(newArticle);
        //           }
        //         }
        //       });//end of each function
    
        //       //adding all new articles to database
        //       db.Article
        //         .create(newArticleArr)
        //         .then(result => res.json({count: newArticleArr.length}))//returning count of new articles to front end
        //         .catch(err => {});
        //     })
        //     .catch(err => console.log(err))//end of rp method
        // })
        // .catch(err => console.log(err))//end of db.Article.find()
    
// end of get request to /scrape//


module.exports= router;


// var express = require("express");
// var logger = require("morgan");
// var mongoose = require("mongoose");

// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");

// var PORT = 3000;

// // Initialize Express
// var app = express();

// // Configure middleware

// // Use morgan logger for logging requests
// app.use(logger("dev"));
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Make public a static folder
// app.use(express.static("public"));

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// // Routes

// // A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with axios
//   axios.get("http://www.echojs.com/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {
//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this)
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children("a")
//         .attr("href");

//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, send it to the client
//           return res.json(err);
//         });
//     });

//     // If we were able to successfully scrape and save an Article, send a message to the client
//     res.send("Scrape Complete");
//   });
// });
