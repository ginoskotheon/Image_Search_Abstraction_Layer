'use strict';

var http = require('http');
var express = require("express");
var app = express();
var path = require('path');
var Search = require('bing.search');

app.set('port', (process.env.PORT || 8080));



app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.route('/latest')

    .get(getRecent);

app.get('/:query', function (req, res){
    var query = req.params.query;
    var offset = req.query.offset || 10;
    var search = new Search(process.env.API_KEY);
    var result = {};
    if(validateURL(url)){
        result = {
            "Term": query,
            "Date": new Date().toLocaleString();
        };


        search.images(query, {
            top: size
        },
        function(err, results) {
            if(err) throw err;
            res.send(results.map(makeList));
        }
        
        
        );
        // res.send(result);
    //     res.send(
    //     "<html>" +
    //     "<head><title>Request URL Microservice</title></head>" +
    //     "<body>" +
    //     "<h1>Request Header Parser</h1>" +
    //    "<p> URL: " + JSON.stringify(result["URL"]) + "</p>" +
    //    "<p>Hobbit URL: <a href='"+ url +"'>"+ JSON.stringify(result["Hobbit URL"]) +  "</a></p>" +
    //     "</body>" +
    //     "</html>"
    //     );
    }
 
});


function makeList(img) {
    return {
        "URL": img.url,
        "Snippet": img.title,
        "Thumbnail": img.thumbnail.url,
        "Context": img.sourceUrl
    };
}

function getRecent(req, res) {
    History 

}

app.listen(app.get('port'), function(){
    console.log('Listening on port', app.get('port'));
});