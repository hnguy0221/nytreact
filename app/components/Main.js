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
    // The moment the page renders get saved articles if any
    componentDidMount: function() 
    {
        //Get the saved article.
        helpers.getSavedArticle().then(function(response) 
        {
            console.log("response.data: ", response.data);
            if (response.data !== this.state.savedArticles) 
            {
                console.log("Saved Articles", response.data);
                this.setState({ savedArticles: response.data });
            }
        }.bind(this));
    },
    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate: function() 
    {
        if (this.state.searchTerm !== "")
        {
            console.log(this.state.searchTerm);
            console.log(this.state.noOfRecords);
            console.log(this.state.startYear);
            console.log(this.state.endYear);

            helpers.runQuery(this.state.searchTerm
                ,this.state.noOfRecords
                ,this.state.startYear
                ,this.state.endYear).then(function(data) 
            {
                if (data !== "") 
                {
                    //the function (componentDidUpdate) gets called when a 
                    //state changes, reset searchTerm to blank so the 
                    //runQuery() above does not gets called again to fix an 
                    //API error.
                    this.setState({ searchTerm: "" });
                    this.setState({ noOfRecords: "" }); 
                    this.setState({ startYear: "" });
                    this.setState({ endYear: "" }); 

                    var articlesArr = [];
                    helpers.removeAllArticles().then(function(response) 
                    {
                        for (var i = 0; i < data.length; i++)
                        {
                            var articleObj = {
                                headline: data[i].headline.main,
                                saved: false,
                                link: data[i].web_url
                            };
                            helpers.postArticle(articleObj).then(function(response)
                            {
                                articlesArr.push(response.data);
                                console.log("Articles: ", articlesArr);
                                this.setState({ results: articlesArr });
                            }.bind(this));
                        }   
                    }.bind(this));          
                }
            }.bind(this));
        }
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
        var articleObj = {
            id: article._id
        };
        helpers.updateArticle(articleObj).then(function(response) 
        {
            //Get the saved articles and reset its state so that
            //the newly saved articles can be displayed. Also, 
            //get the unsaved articles and reset its state to 
            //display the unsaved articles.
            helpers.getSavedArticle().then(function(response) 
            {
                console.log("response.data: ", response.data);
                if (response.data !== this.state.savedArticles) 
                {
                    console.log("Saved Articles", response.data);
                    this.setState({ savedArticles: response.data });
                }
                helpers.getArticles().then(function(response) 
                {
                    console.log("Articles: ", response.data);
                    this.setState({ results: response.data });
                }.bind(this));
            }.bind(this));
        }.bind(this));       
    },
    removeSavedArticle: function(article)
    {
        var articleObj = {
            headline: article.headline,
            saved: true,
            id: article._id
        }
        helpers.removeSavedArticle(articleObj).then(function(response) 
        {
            //Get the remaining saved articles and reset its state to
            //display the remaining saved articles.
            helpers.getSavedArticle().then(function(response) 
            {
                console.log("response.data: ", response.data);
                if (response.data !== this.state.savedArticles) 
                {
                    //the function (componentDidUpdate) gets called when the 
                    //state changes, reset searchTerm to blank so the 
                    //runQuery() above does not gets called again to fix an 
                    //API error.
                    this.setState({ searchTerm: "" });
                    this.setState({ noOfRecords: "" }); 
                    this.setState({ startYear: "" });
                    this.setState({ endYear: "" }); 

                    console.log("Saved Articles", response.data);
                    this.setState({ savedArticles: response.data });
                }
            }.bind(this));
        }.bind(this));   
    },
    clearResults: function()
    {
        helpers.removeAllArticles().then(function(response) 
        {
            helpers.getArticles().then(function(response) 
            {
                console.log("Articles: ", response.data);
                this.setState({ results: response.data });
            }.bind(this));
        }.bind(this)); 
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
	                <Search 
                        setToFormValues={this.setToFormValues} 
                        clearResults={this.clearResults}
                    />
	            </div>
	            {/*This row will handle all of the retrieved articles*/}
	            <div className="row">
	                <Results 
                        articles={this.state.results}  
                        onArticleSaved={this.onArticleSaved} 
                    />
	            </div>
	            {/*This row will handle all of the saved articles*/}
	            <div className="row">
	                <SavedArticles 
                        savedArticles={this.state.savedArticles} 
                        removeSavedArticle={this.removeSavedArticle}
                    />
	            </div>
            </div>
        );
    }
});

module.exports = Main;