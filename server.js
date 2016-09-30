'use strict';

var http = require('http');
var express = require("express");
var app = express();
var dotenv = require('dotenv').config();
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var api = require('./js/img_find.js');

var historySchema = new Schema({
    term: String,
    when: String
});

var History = mongoose.model('History', historySchema);

var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/image_search';      
//(Focus on This Variable)
// mongoose.createConnection(url);
// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});

api(app, History);



var port = process.env.PORT || 8080;

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

// app.get('/:query', 

// app.route('/latest')

//     .get(getRecent);


app.listen(port, function(){
    console.log('Listening on port ' + port);
});