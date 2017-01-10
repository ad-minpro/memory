// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan'); 
var path = require('path');


// configuration ===========================================
var api = require('./app/api');
    
// config files
// var db = require('./config/db');

// set our port
var port = 3000; 



// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// static folders
app.use(express.static('www'));

app.use(morgan('dev')); 



console.log(path.join(__dirname + '/www/index.html'));


app.use('/api', api);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(port, function () {
	console.log('Example app listening on port 3000!');
});

// expose app           
exports = module.exports = app; 