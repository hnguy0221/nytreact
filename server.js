// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Require Article Schema
var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/reactnyt");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api/headlines", function(req, res) 
{
    var query = req.query;
    console.log("query: " + JSON.stringify(query));
    var saved = query.saved;
    console.log("saved: " + saved);
    // We will find all the records, sort it in descending order, then limit the records to 5
    Article.find({saved: saved}).sort([
        ["date", "descending"]
    ]).exec(function(err, doc) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            res.send(doc);
        }
    });
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api/id", function(req, res) 
{
    var query = req.query;
    console.log("query: " + JSON.stringify(query));
    var id = query.id;
    console.log("id: " + id);
    // We will find all the records, sort it in descending order, then limit the records to 5
    Article.find({_id: id}).exec(function(err, doc) {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

// This is the route we will send PUT requests to update an article.
app.put("/api", function(req, res) 
{
    console.log("In put(), BODY: " + JSON.stringify(req.body.article));
    // Here we'll save the article based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Article.update({_id: req.body.article.id}, {$set: {saved: true}}, function(err, doc) 
    {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) 
{
    console.log("BODY: " + JSON.stringify(req.body.article));
    // Here we'll save the article based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Article.create({
        headline: req.body.article.headline,
        date: Date.now(),
        saved: req.body.article.saved,
        link: req.body.article.link
    }, function(err, doc) {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

app.delete("/api", function(req, res) 
{
    var query = req.query;
    console.log("query: " + JSON.stringify(query));
    console.log("ID: " + query.id);
    Article.remove({
        _id: query.id,
        saved: true
    }, function(err, doc) {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

app.delete("/api/all", function(req, res) 
{
    Article.remove({
        saved: false
    }, function(err, doc) {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});
// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
	
});