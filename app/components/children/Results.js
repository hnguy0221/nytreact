var React = require("react");
var helpers = require("../utils/helpers");

var Results = React.createClass(
{
	handleSaveArticle: function(article)
	{
        helpers.postArticle(article).then(function(response) 
        {
            this.props.onArticleSaved(article);
        });
	},
    render: function() 
    {
        return (
	        <div className="col-sm-12">
	            <br />
		        {/*This panel will initially be made up of a panel and wells for each of the articles retrieved*/}
		        <div className="panel panel-primary">
			        {/*Panel Heading for the retrieved articles box*/}
			        <div className="panel-heading">
				        <h3 className="panel-title">
				            <strong><i className="fa fa-table"></i>   Top Articles</strong>
				        </h3>
			        </div>
			        {/*This main panel will hold each of the resulting articles*/}
			        <div className="panel-body" id="wellSection">
			            {/* Here we use a map function to loop through an array in JSX */}
                        {this.props.results.map((function(article, i) {
                        	if (article.headline != null)
                        	{
                                return (
                            	    <div key={article._id} className="panel panel-default">
	                                    <div className="panel-heading">
	                                        <h3><span class="label label-primary">{i+1}</span>. {article.headline}
	                                            {/*<button className="btn btn-success save" onClick={(function() {
	                                            	this.props.onArticleSaved(article);}).bind(this)}>
	                                                Save Article
	                                            </button>*/}
	                                            <button className="btn btn-success save" onClick={this.handleSaveArticle}>
	                                                Save Article
	                                            </button>
	                                        </h3>
	                                    </div>
	                                </div>
                                );
                            }
                        }).bind(this))}
			        </div>
		        </div>
		    </div>
		);
    }
});

module.exports = Results;