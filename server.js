var express = require('express');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

/*
//page d'accueil
app.get('/', function(req, res) {
	res.render(__dirname + "/"+'accueil.html');
});
*/

//register
app.get('/register', function(req, res) {
	res.render(__dirname + "/views/"+'register.ejs');
});

app.post('/register/add/',urlencodedParser, function(req, res){
  var response = {
      first_name:req.body.firstName,
      last_name:req.body.lastName,
      email:req.body.email,
      password:req.body.password,
      birthDate:req.body.birthDate,
      country:req.body.country,
      gender:req.body.gender
  }
   console.log(response);
   res.redirect('/register');
});
/*
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
	res.redirect('/');
});*/

/*
app.get('/:pagename', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end();
});
*/

app.listen(8080);