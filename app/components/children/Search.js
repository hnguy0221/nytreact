var React = require("react");

var Search = React.createClass(
{
    // Here we set a generic state associated with the text being searched for
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
    // This function will respond to the user input
    handleChangeTerm: function(event) {
        this.setState({ searchTerm: event.target.value });
    },
    // This function will respond to the user input
    handleChangeRecords: function(event) {
        this.setState({ noOfRecords: event.target.value });
    },
    // This function will respond to the user input
    handleChangeStart: function(event) {
        this.setState({ startYear: event.target.value });
    },
    // This function will respond to the user input
    handleChangeEnd: function(event) {
        this.setState({ endYear: event.target.value });
    },
    // When a user submits...
    handleSubmit: function(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();

        // Set the parent to have the search term
        this.props.setToFormValues(this.state.searchTerm
        	,this.state.noOfRecords
        	,this.state.startYear
        	,this.state.endYear);
        this.setState({ searchTerm: "" });
        this.setState({ noOfRecords: "" });
        this.setState({ startYear: "" });
        this.setState({ endYear: "" });
    },
    render: function() {
        return (
            <div className="col-sm-12">
                <br />
                {/*First panel is for handling the search parameters*/}
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <strong>
                                <i className="fa fa-list-alt"></i>   Search Parameters
                            </strong>
                        </h3>
                    </div>
                    <div className="panel-body">
                        {/*Here we create an HTML Form for handling the inputs*/}
                        <form role="form" onSubmit={this.handleSubmit}>
                            {/*Here we create the text box for capturing the search term*/}
                            <div className="form-group">
                                <label>Search Term:</label>
                                <input 
                                    value={this.state.searchTerm} 
                                    type="text" 
                                    className="form-control" 
                                    id="searchTerm" 
                                    onChange={this.handleChangeTerm}
                                    required
                                />
                            </div>
                            {/*Here we capture the number of records that the user wants to retrieve*/}
                            <div className="form-group">
                                <label>Number of Records to Retrieve:</label>
                                {/*<select
                                       value={this.state.noOfRecords}
                                       className="form-control" 
                                       id="numRecordsSelect"
                                       onChange={this.handleChangeRecords}>
                                       <option value="1">1</option>*/}
                                       {/*Setting the option for 5 as default*/}
                                       {/*<option value="5" selected="">5</option>
                                       <option value="10">10</option>
                                   </select>*/}
                                <input 
                                    value={this.state.noOfRecords} 
                                    type="text"
                                    className="form-control" 
                                    id="noOfRecords" 
                                    onChange={this.handleChangeRecords}
                                    required
                                />	  
                            </div>
                            {/*Here we capture the Start Year Parameter*/}
                            <div className="form-group">
                                <label>Start Year (Optional):</label>
                                <input 
                                    value={this.state.startYear}
                                    type="text" 
                                    className="form-control" 
                                    id="startYear"
                                    onChange={this.handleChangeStart}
                                />
                            </div>
                            {/*Here we capture the End Year Parameter*/}
                            <div className="form-group">
                                <label>End Year (Optional):</label>
                                <input
                                    value={this.state.endYear}
                                    type="text" 
                                    className="form-control" 
                                    id="endYear" 
                                    onChange={this.handleChangeEnd}
                                />
                            </div>
                            {/*Here we have our final submit button*/}
                            <button type="submit" className="btn btn-default" id="runSearch"><i className="fa fa-search"></i> Search</button>
                            <button type="button" className="btn btn-default" id="clearAll" onClick={(function() {
                                this.props.clearResults();}).bind(this)}><i className="fa fa-trash"></i> Clear Results
                            </button>
                        </form>
	            </div>
	        </div>
            </div>
        );
    }
});

module.exports = Search;
