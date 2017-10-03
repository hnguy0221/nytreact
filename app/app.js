// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");
var Main = require("./components/Main");
// Grabs the Routes 
//var routes = require("./config/routes");

// Renders the contents according to the route page.
var destination = document.querySelector("#container");
ReactDOM.render(<Main />, destination);