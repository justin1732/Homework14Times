const express = require ("express");
const router = express.Router();
const db = require ("../models");

router.get('/getNotes/:id', (req, res) => {
    db.Article
    .findOne({_id: req.params.id})
    .populate('notes')
    .then (results => res.json(results))
    .catch(err => res.json(err));
});

router.get('/getSingleNote/:id', function(req, res){
    db.Note
    findOne({_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

router.post('/createNote', function (req, res){
let { title, body, articleId } = req.body;
let note = { title, body }
db.Note 
.create(note)
.then(result => {
    dbArticle
    .findOneandUpdate ({_id: articleId}, {$push:{notes: result._id}},{new:true})
    .then(data=> res.json(result))
    .catch(err => res.json(err))
})
.catch(err => res.json(err))
});
router.post ('/deleteNote', (req, res) =>{
    let ({articleId, noteId}) = req.body
    db.Note
    .remove({_id:noteId})
    .then(result => res.json(result))
    .catch(err => res.json (err))
})

module.exports = router;