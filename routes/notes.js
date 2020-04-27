var express = require ("express");
var router = express.Router();
var db = require ("../models");

router.get('/getNotes/:id', (req, res) => {
    db.Article
    .findOne({_id: req.params.id})
    .populate('notes')
    .then (results => res.json(results))
    .catch(err => res.json(err));
});

router.post ('/deleteNote', (req, res) =>{
    let ({articleId, noteId}) = req.body
    db.Note
    .remove({_id:noteId})
    .then(result => res.json(result))
    .catch(err => res.json (err))
})

module.exports = router;