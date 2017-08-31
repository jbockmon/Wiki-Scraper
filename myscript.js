$(document).ready(function(){

    $("button#queryButton").click( function(){
        $(".wrapper").empty();
        var userInput = $("#textArea").val();
        $(".searchDiv").animate(
            {top: '5%' }, 
            {complete: function() {
                $(".searchDiv").css({"position": "static",
                "top": "0%",
                "left": "0%",
                "transform": "translate(0%, 0%)",
                "display": "table",
                "margin": "0 auto"
                });
                getData(userInput);
                }    
        });   
        return false;
    });
});

function getData(searchVal) {
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&&origin=*&srsearch=" + searchVal, gotData);  
};

function gotData(data) {

    if(data.query.search.length == 0){
        $(".wrapper").append("No results!");
    }else{
        for(var i = 0; i < data.query.search.length; i++){
            $(".wrapper").append(
                "<div class = 'results' onclick=\"location.href='" + "https://en.wikipedia.org/?curid=" + 
                    data.query.search[i].pageid + "';\">" + 
                    "<strong>" + data.query.search[i].title + "</strong><br>" +
                    data.query.search[i].snippet + "<br>" +
                    data.query.search[i].timestamp +
                "</div>"
                );
        }
    }
};

