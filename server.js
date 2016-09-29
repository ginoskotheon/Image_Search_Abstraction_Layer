'use strict';

var http = require('http');
var express = require("express");
var app = express();
var path = require('path');


app.set('port', (process.env.PORT || 8080));




app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});



 app.get('/:url*', function (req, res){
    var home = "https://sleepy-savannah-67922.herokuapp.com/"
    var url = req.url.slice(1);
    var result = {};
    if(validateURL(url)){
        result = {
            "URL": url,
            "Hobbit URL": home + linkGen()
        };
        // res.send(result);
        res.send(
        "<html>" +
        "<head><title>Request URL Microservice</title></head>" +
        "<body>" +
        "<h1>Request Header Parser</h1>" +
       "<p> URL: " + JSON.stringify(result["URL"]) + "</p>" +
       "<p>Hobbit URL: <a href='"+ url +"'>"+ JSON.stringify(result["Hobbit URL"]) +  "</a></p>" +
        "</body>" +
        "</html>"
        );
    }
    else {
        result = {
        "error": "No hobbits here. Make sure the URL has 'https://' proceeding it."
     
        };
        res.send(result);

    }  
});


function linkGen() {
    var num = Math.floor(100000 + Math.random() * 900000);
    return num.toString().substring(0, 4);
}

function validateURL(url) {
    // Checks to see if it is an actual url
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }

app.listen(app.get('port'), function(){
    console.log('Listening on port', app.get('port'));
});