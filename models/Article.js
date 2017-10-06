var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String
    },
    date: {
        type: Date
    },
    saved: {
        type: Boolean
    },
    link: {
        type: String
    }
});

var Article = mongoose.model("Article", ArticleSchema);
	
module.exports = Article;