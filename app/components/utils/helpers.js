// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

    // This function serves our purpose of running the query to nyt.
    runQuery: function(term, noOfRecords, startYr, endYr) 
    {
        // NYT API
        var queryBaseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        var apiKey = "55d2c173aafb46f28a31f032dc749014";
        var queryUrl = "";
        
        queryUrl = queryBaseUrl + "?q=" + term;

        if (startYr !== "")
        {
            startYr += "1231";
            queryUrl += "&begin_date=" + startYr;
        }

        if (endYr !== "")
        {
            endYr += "1231";
            queryUrl += "&end_date=" + endYr;
        }

        queryUrl += "&api-key=" + apiKey;

        //console.log(queryUrl);

        return axios.get(queryUrl).then(function(response) 
        {
            // If get get a result, return the result
            console.log(response.data.response.docs);
            if (response.data.response.docs.length !== 0) 
            {
                var articles = [];
                var recordsCnt = parseInt(noOfRecords);
                if (recordsCnt > response.data.response.docs.length)
                {
                    recordsCnt = response.data.response.docs.length;
                }
                for (var i = 0; i < recordsCnt; i++)
                {
                    articles.push(response.data.response.docs[i])
                }
                return articles;
            }
            else
            {
                console.log("No data found from ny times api!")
                // If we don't get any results, return an empty string
                return "";
            }
        });
    },

    // This function hits our own server to retrieve a record of query results
    getSavedArticle: function() 
    {
        return axios.get("/api/headlines?saved=true");
    },

    // This function hits our own server to retrieve a record of query results
    getArticleById: function(id) 
    {
        var path = "/api/id?_id="+id;
        return axios.get(path);
    },

    // This function hits our own server to retrieve the record of query results
    getArticles: function() 
    {
        return axios.get("/api/headlines?saved=false");
    },

    // This function posts new article to our database.
    updateArticle: function(article) 
    {
        return axios.put("/api", { article: article });
    },

    // This function posts new article to our database.
    postArticle: function(article) 
    {
        return axios.post("/api", { article: article });
    },

    removeSavedArticle: function(article)
    {
        console.log("ID to delete: " + article.id);
        return axios.delete("/api", {params: { id: article.id } });
    },

    removeAllArticles: function()
    {
        return axios.delete("/api/all");
    }
};

// We export the API helper
module.exports = helper;