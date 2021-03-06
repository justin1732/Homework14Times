  
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }]
 

});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
