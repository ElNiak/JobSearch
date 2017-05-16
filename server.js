var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('views'));

app.set('view engine', 'ejs');

//page d'accueil
app.get('/', function(req, res) {
	res.render(__dirname + "/"+'accueil.html');
});

//register
app.get('/register', function(req, res) {
	res.render(__dirname + "/views/"+'register.ejs');
});

//page CV
app.get('/cv', function(req, res) {
	res.render('ajoutCV.html');
});

//page Job
app.get('/job', function(req, res) {
	res.render('ajoutJob.html');
});

//navigation cv
app.get('/navigationCV', function(req, res) {
	res.render('navigationCV.html');
});

//navigation job
app.get('/navigationJob', function(req, res) {
	res.render('navigationJob.html');
});

//404
app.use(function(req, res, next){
});

/*
app.get('/:pagename', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end();
});
*/

app.listen(8080);