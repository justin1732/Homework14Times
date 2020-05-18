const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();
const CORS= require ("cors");
app.use(CORS());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";


mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log("database connected")
});

app.get("/", (req, res) => {
    db.Article
        .find({saved: false})
        .populate("notes")
        .then(dbArticles => {
            
            res.render("home", { articles: dbArticles});
        })
});

app.get("/scrape", (req, res) => {
    axios.get("https://www.nytimes.com/section/us")
        .then(response => {
            const $ = cheerio.load(response.data);
            $("article").each(function (i, element) {
                let title = $(element).find("h2").find("a").text()
                let summary = $(element).find("p").first().text()
                let url = $(element).find("h2").find("a").attr("href")
                let link = "https://nytimes.com" + url;
                let image = $(element).find("a").find("img").attr("src")
                let post = {
                    title: title,
                    summary: summary,
                    link: link,
                    image: image
                }
                db.Article
                    .create(post)
                    .then(dbArticle => { 
                        // res.json(dbArticle)
                    })
                    .catch(err => console.log(err))
            })
        })
        .then(()=>res.redirect("/"))
        
})

app.post("/api/:articleId/notes", (req, res) => {
    console.log(req.body)
    db.Notes
        .create({ body: req.body.body })
        .then(dbNotes => {
            console.log("Noted!")
            return db.Article.findOneAndUpdate({ _id: req.params.articleId }, { $push: { notes: dbNotes._id } }, { new: true })
        })
        .then(dbNotes => res.send(dbNotes))
        .catch(err => res.json(err))
})

app.delete("/api/:notesId/notes", (req, res) => {
    db.Notes
      .findOneAndDelete({_id: req.params.notesId})
      .then(dbResult => res.json(dbResult))
})


app.get("/api/clear", (req, res) => {
    db.Article
      .deleteMany({saved: false}, function() {
          console.log("cleared")
      })
      .then(() => res.redirect("/"))
})

app.post("/articles/:articleId", (req, res) => {
    db.Article
      .findOneAndUpdate({_id: req.params.articleId}, {saved: true}, {new: true})
      .then((dbArticle) => res.json(dbArticle))
    //   .then(()=>res.redirect("/"))
      })

app.delete("/articles/:articleId", (req, res) => {
    db.Article
      .findOneAndUpdate({_id: req.params.articleId}, {saved: false}, {new: true})
      .then((dbArticle) => res.json(dbArticle))
})

app.get("/saved", (req, res) => {
    db.Article
      .find({saved: true})
      .populate("notes")
      .then(dbArticles => res.render("saved", {saved: dbArticles}))
})

app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`)
});