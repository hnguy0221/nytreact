$(document).ready(function() 
{
    $("#clearAll").on("click", clearResults);
    //$(".save").on("click", clearResults);

    function clearResults() 
    {
        $("#wellSection").empty();
    }
});