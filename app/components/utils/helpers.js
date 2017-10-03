// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NYT API
var queryBaseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var searchParams;
var apiKey = "55d2c173aafb46f28a31f032dc749014";
var queryUrl = "";

// Helper functions for making API Calls
var helper = {

    // This function serves our purpose of running the query to nyt.
    runQuery: function(term, startYr, endYr) 
    {
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

        console.log(queryUrl);

        return axios.get(queryUrl).then(function(response) 
        {
            // If get get a result, return the result
            console.log(response.data.response.docs);
            if (response.data.response.docs) 
            {
                return response.data.response.docs;
            }
            // If we don't get any results, return an empty string
            return "";
        });
    },

    // This function hits our own server to retrieve a record of query results
    getArticle: function(id) 
    {
        return axios.get("/api/id?_id=id");
    },

    // This function hits our own server to retrieve the record of query results
    getArticle: function() 
    {
        return axios.get("/api/headlines?saved=false");
    },

    // This function posts new article to our database.
    postArticle: function(article) 
    {
        return axios.post("/api", { article: article });
    }
};

// We export the API helper
module.exports = helper;