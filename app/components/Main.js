var React = require("react");
var Search = require("./children/Search");
var Results = require("./children/Results");
var SavedArticles = require("./children/SavedArticles");
// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var Main = React.createClass(
{
	getInitialState: function() 
	{
		return {
			searchTerm: "",
			noOfRecords: "",
			startYear: "",
			endYear: "",
			results: [],
			savedArticles: []
		};
	},
    // // The moment the page renders get articles
    // componentDidMount: function() 
    // {
    //     // Get the latest article.
    //     helpers.getArticle().then(function(response) 
    //     {
    //         console.log("response.data: ", response.data);
    //         if (response !== this.state.results) 
    //         {
    //             console.log("Articles", response.data);
    //             this.setState({ results: response.data });
    //         }
    //     }.bind(this));
    // },
    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate: function() 
    {
    	console.log(this.state.searchTerm);
    	console.log(this.state.noOfRecords);
    	console.log(this.state.startYear);
    	console.log(this.state.endYear);
        // Run the query for the address
        helpers.runQuery(this.state.searchTerm
        	,this.state.startYear
        	,this.state.endYear).then(function(data) 
        {
            if (data !== this.state.results) 
            {
                console.log("Articles: ", data);
                var articles = [];
                //var articlesToSave = [];
                var displayCnt = parseInt(this.state.noOfRecords);
                for (var i = 0; i < displayCnt; i++)
                {
                    if (data[i].headline != null)
                    {
                        var articleObj = {
                            headline: data[i].headline.main,
                            saved: false
                        };
                    	//articles.push(data[i]);
                    	// After we've received the results... then post the results 
                        // to our article database.
                        helpers.postArticle(articleObj).then(function(response) 
                        {
                            console.log("Updated!");
                            console.log("Current Article: " + JSON.stringify(response.data));
                            // var id = response.data._id;
                            // console.log("id: " + id);
                            articles.push(response.data);
                            console.log("articles: " + JSON.stringify(articles));
                            // After we've done the post... then get the updated article
                            // helpers.getArticle(id).then(function(response) 
                            // {
                            //     articles.push(response.data);
                            //     console.log("Articles: " + articles);
                            // }.bind(this));
                        }.bind(this));
                    }
                }
                this.setState({ results: articles }); 
                // this.setState({ savedArticles: articlesToSave });              
            }
        }.bind(this));
    },
    // This function allows childrens to update the parent.
    setToFormValues: function(term, recordsCnt, startYr, endYr) 
    {
        this.setState({ searchTerm: term });
        this.setState({ noOfRecords: recordsCnt });
        this.setState({ startYear: startYr });
        this.setState({ endYear: endYr });
    },
    onArticleSaved: function(article)
    {
        this.setState(function(prevState) 
        {
        	// var newState = prevState.savedArticles.slice();
        	// newState.push(Object.assign({}, article));
        	// return {savedArticles: newState};
        	var tmpSavedArticles = prevState.savedArticles;
            tmpSavedArticles.push(article);
            return {savedArticles: tmpSavedArticles};
        });
    },
    render: function() {
    	var jumbotronStyle = {
            backgroundColor: "#20315A",
            color: "#FFF"
        };
        return (
        	<div className="container">
	            <div className="jumbotron" style={jumbotronStyle}>
			        <h1 className="text-center">
			            <strong>
			                <i className="fa fa-newspaper-o"></i> New York Times Search
			            </strong>
			        </h1>
		        </div>
		        {/*Row for Searching New York Times*/}
	            <div className="row">
	                <Search setToFormValues={this.setToFormValues} />
	            </div>
	            {/*This row will handle all of the retrieved articles*/}
	            <div className="row">
	                <Results results={this.state.results}  onArticleSaved={this.onArticleSaved} />
	            </div>
	            {/*This row will handle all of the saved articles*/}
	            <div className="row">
	                <SavedArticles articles={this.state.savedArticles} />
	            </div>
            </div>
        );
    }
});

module.exports = Main;