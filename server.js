var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(express.static('views'));

app.set('view engine', 'ejs');

//page d'accueil
app.get('/', function(req, res) {
	res.render(__dirname + "/views/"+'accueil.ejs');
});

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

//page CV
app.get('/cv', function(req, res) {
	res.render(__dirname + "/views/"+'ajoutCV.ejs');
});
app.post('/cv/add/',urlencodedParser, function(req, res){
  var response = {
      profil_image_upload:req.body.profile_image_upload,
			firstnameCV:req.body.firstnameCV,
      lasttnameCV:req.body.lasttnameCV,
      emailCV:req.body.emailCV,
			phoneCV:req.body.phoneCV,
			qualifCV:req.body.qualifCV,
      experienceCV:req.body.experienceCV,
      localisationCV:req.body.localisationCV,
      motherTongueCV:req.body.motherTongueCV,
			sTongueCV:req.body.sTongueCV,
			desciCV:req.body.desciCV,
			motivCV:req.body.motivCV,
			attemptsCV:req.body.attemptsCV
  }
   console.log(response);
   res.redirect('/cv');
});

//page Job
app.get('/job', function(req, res) {
	res.render(__dirname + "/views/"+'ajoutJob.ejs');
});
app.post('/job/add/',urlencodedParser, function(req, res){
  var response = {
		profil_image_upload2:req.body.profile_image_upload2,
		companyname:req.body.companyname,
		emailComp:req.body.emailComp,
		phoneComp:req.body.phoneComp,
		experienceComp:req.body.experienceCV,
		localisationComp:req.body.localisationCV,
		sTongueComp:req.body.sTongueComp,
		salary:req.body.salary,
		temp:req.body.temp,
		grad:req.body.grad,
		descrComp:req.body.descrComp
  }
   console.log(response);
   res.redirect('/job');
});

//navigation cv
app.get('/navigationCV', function(req, res) {
	res.render(__dirname + "/views/"+'navigationCV.ejs');
});

//navigation job
app.get('/navigationJob', function(req, res) {
	res.render(__dirname + "/views/"+'navigationJob.ejs');
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
