"use strict";
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    post = require('./routes/posts'),
    session = require('express-session');
    var cors = require('cors');
    //var nodeSSPI = require('node-sspi');
    var app = express();
    var server = require('http').createServer(app);

// This only invokes the user security with '/admin' and '/api' routes. Public routes ('/' and '/document') require no security
// and therefore don't need to be logged in with their userid.

app.use(cors());
app.options('*',cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret:'IIRRelease'
, resave:false
, saveUninitialized:false })); 
//The dist folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/dist'));
app.use('/api', post);
/* app.use(function (req, res, next) {
    //var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: false
    });
    try{
        nodeSSPIObj.authenticate(req, res, function (err) {
            res.finished || next()
        })
    }
    catch (err)
     {

        res.status(500).send(JSON.stringify({status:500,message:"url mal formated",detail:err.message}));
    }
   
});    */
['/api'].forEach(p=> {
    app.use(function (req, res, next) {
      var nodeSSPI = require('node-sspi');
      var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: false
      });
      try{
        nodeSSPIObj.authenticate(req, res, function (err) {
            res.finished || next()
        })
    }
    catch (err)
     {

        res.status(500).send(JSON.stringify({status:500,message:"url mal formated",detail:err.message}));
    }
  });  
});





app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

// redirect all others to the index (HTML5 history)
app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});
var port = process.env.port || 3060;
server.listen(port, function(){
    console.log('Express listening on port ' + port )
});

//console.log('Express listening on port 3060.');

//Open browser
// var opn = require('opn');

// opn('http://localhost:3060').then(() => {
//     console.log('Browser closed.');
// });


