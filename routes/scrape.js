const express = require ('express');
const cheerio = require ('cheerio');
const rp = require ('request-promise');
const router= express.Router();
const db = require ('../models');
const axios= require ('axios');

router.get("/newArticles", function(req,res) {
    const options = { uri: 'https://www.nytimes.com', transform: function (body){ return cheerio.load(body)}};
 
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
              $('#latest-panel article.story.theme-summary').each((i, element) => {
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


module.exports= router;

//     })
//     const options = {
//     uri: 'https://www.nytimes.com/section/us',
//     transform: function (body){
//         return cheerio.load(body);
//         }
// };
// db.Article
// .find({})
// .then((savedArticles) => {
//     let savedHeadlines = savedArticles.map(article => article.headline)
//     rp(options)
//     .then(function ($) {
//         let newArticleArr = [];
//         $('#latest-panel article.story.theme-summary').each((i, element) => {
//             let newArticle = new db.Article({
//                 storyUrl: $(element).find('.story-body>.story-link').attr('href'),
//                 headline: $(element).find('h2.headline').text().trim(),
//                 summary: $(element).find('p.summary').text().trim(),
//                 imgUrl: $(element).find('img').attr('src'),
//                 byLine: $(element).find('p.byline').text().trim()
//             });
//             if (newArticle.storyUrl){
//                 newArticleArr.push(newArticle);
//             }
//         })
//         db.Article
//         .create(newArticleArr)
//         .then(result => res.json({count: newArticleArr.length}))
//         .catch(err => {});
//     })
//     .catch(err => console.log(err))
// })
// .catch(err => console.log(err))
// });

// module.exports = router;