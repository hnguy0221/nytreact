var React = require("react");

var SavedArticles = React.createClass(
{
    render: function() {
        return (
	        <div className="col-sm-12">
	            <br />
		        {/*This panel will initially be made up of a panel and wells for each 
		           of the saved articles retrieved
		        */}
		        <div className="panel panel-primary">
			        {/*Panel Heading for the retrieved articles box*/}
			        <div className="panel-heading">
				        <h3 className="panel-title">
				            <strong><i className="fa fa-table"></i>   Saved Articles</strong>
				        </h3>
			        </div>
			        {/*This main panel will hold each of the saved articles*/}
			        <div className="panel-body" id="wellSection-2">
				        {this.props.savedArticles.map((function(article, i) {
	                        return (
	                        	<div key={article._id} className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3>
                                            <a className="article-link" target="_blank" href={article.link}>
                                                <span className="label label-primary">{i+1}</span> {article.headline}
                                            </a>
                                            <button className="btn btn-success delete" onClick={(function() {
                                                this.props.removeSavedArticle(article);}).bind(this)}>
	                                            Delete Article
	                                        </button>
                                        </h3>
                                    </div>
                                </div>
                            );
				        }).bind(this))}
			        </div>
		        </div>
		    </div>
		);
    }
});

module.exports = SavedArticles;