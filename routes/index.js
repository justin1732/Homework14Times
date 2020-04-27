var express = require ("express");
var router = express.Router();
var db = require ("../models");

router.get('/', (req, res) => {
    db.Article
    .find({})
    .then(articles => res.render('index', {articles}))
    .catch(err => res.json(err));
});

module.exports = router;