const express = require ('express');
const cheerio = require ('cheerio');
const rp = require ('request-promise');
const router= express.Router();
const db = require ('../models');

router.get("/newArticles", function(req,res) {
    const options = {
    uri: 'https://www.nytimes.com/section/us',
    transform: function (body){
        return cheerio.load(body);
        }
};
db.Article
.find({})
.then((savedArticles) => {
    let savedHeadlines = savedArticles.map(article => article.headline)
    rp(options)
    .then(function ($) {
        let newArticleArr = [];
        $('#latest-panel article.story.theme-summary').each((i, element) => {
            let newArticle = new db.Artitcle({
                storyUrl: $(element).find('.story-body>.story-link').attr('href'),
                headline: $(element).find('h2.headline').text().trim(),
                summary: $(element).find('p.summary').text().trim(),
                imgUrl: $(element).find('img').attr('src'),
                byLine: $(element).find('p.byline').text().trim()
            });
            if (newArticle.storyUrl){
                newArticleArr.push(newArticle);
            }
        })
        db.Article
        .create(newArticleArr)
        .then(result => res.json({count: newArticleArr.length}))
        .catch(err => {});
    })
    .catch(err => console.log(err))
})
.catch(err => console.log(err))
});

module.exports = router;