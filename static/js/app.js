$(document).ready(function(){
    $("#runScriptBtn").click(function(){
        $.ajax({
            type: "GET",
            url: "/run_script",
            success: function(response){
                alert(response);
            },
            error: function(xhr, status, error){
                alert("Error occurred while executing script: " + error);
            }
        });
    });
});