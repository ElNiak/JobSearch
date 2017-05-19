var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session')
var mongo = require('mongodb');
var monk = require('monk');

var db = monk('localhost:27017/JobSearch');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(session({
    secret: "cookie_secret",
    name: "cookie_name",
    user: {},
    resave: false,
    saveUninitialized: false,
    maxAge : 24*60*60*1000 //cookie kept for a day
}));
app.use(function(req, res, next){
    if (typeof(req.session.user) == 'undefined') {
        req.session.user = {}
    }
    next();
})

//page d'accueil
app.get('/', function(req, res) {
  //if user is allready logged in, log him out
  if(req.session.user){
    req.session.destroy(function(err) {
      if(err) {
        res.send(err);
      }
    });
  }
	res.render(__dirname + "/views/"+'accueil.ejs');
});
//action: login
app.post('/login', urlencodedParser, function(req, res){  
  var response = {
    email:req.body.email,
    password: req.body.password
  }
  db.get('users').findOne(response,
    (err, doc) => {
      if (err) {//erreur lors de la recherche dans la base de donnée
        res.send(err);
      }
      else {
        if(doc){//on a trouvé un utilisateur correspondant
          req.session.user = doc;
          res.redirect('/navigationJob');
        }
        else{//aucun utilisateur correspondant dans la base de donnée
          res.redirect('/', {message: "Invalid credentials!"});//TODO afficher message
        }
      }
    }
  );  
});

//register
app.get('/register', function(req, res) {
	res.render(__dirname + "/views/"+'register.ejs');
});
app.post('/register/add/',urlencodedParser, function(req, res){
  //récupère les données de l'utilisateur
	var response = {
   	first_name:req.body.firstName,
   	last_name:req.body.lastName,
   	email:req.body.email,
   	password:req.body.password,
   	birthDate:req.body.birthDate,
   	country:req.body.country,
   	gender:req.body.gender,
    cv:{}
  }
  //insère les données dans la db et crée la session d'utilisateur
  //vérifie d'abord si l'adresse email est déjà utilisée
  db.get('users').findOne({email:response.email},
    (err, doc) => {
      if (err) {//erreur lors de la recherche dans la base de donnée
        res.send(err);
      }
      else{
        if(doc){//mail déjà utilisé
          res.render(__dirname + "/views/"+'register.ejs',{message: 'Adresse mail déjà utilisée'});
        }
        else{
          db.get('users').insert(response,
            (err, doc) => {
              if (err) {//erreur lors de de l'insertion dans la base de donnée
                res.send(err);
              }
              else {//success
                req.session.user = doc;
                res.redirect('/navigationCV');
              }
            }
          );
        }
      }
    }
  );
});

//page ajouter CV
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
		attemptsCV:req.body.attemptsCV,
    sectorCV:req.body.sectorCV2
  }
  //change le cv de l'utilisateur en cours
  db.get('users').findOneAndUpdate(req.session.user._id, {cv:response}).then(
    (err, doc) => {
      if (err) {
        res.send(err);
      }
      else {
        res.redirect('/navigationCV');
      }
    }
  );
});
//navigation cv
app.get('/navigationCV', function(req, res) {
  db.get('users').find({},'cv').then(
    (doc) => {
      res.render(__dirname + "/views/"+'navigationCV.ejs',{cvlist:doc});
    }
  );
});
//recherche cv
app.post('/navigationCV/search/',urlencodedParser, function(req, res){
  var response = {
    sectorCV:req.body.sectorCV,
    experienceCV:req.body.expeCV,
    localisationCV: req.body.locCV
  }
  db.get('users').find({},'cv').then(
    (doc) => {
      res.render(__dirname + "/views/"+'navigationCV.ejs',{cvlist:doc});
    }
  );
}

//page ajouter Job
app.get('/job', function(req, res) {
  res.render(__dirname + "/views/"+'ajoutJob.ejs');
});
app.post('/job/add/',urlencodedParser, function(req, res){
  var response = {
    user_id: req.user.session._id,
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
    descrComp:req.body.descrComp,
    sectorComp: req.body.sectorComp
  }
  db.get('job').insert(response,
    (err, doc) => {
      if (err) {
        res.send(err);
      }
      else {
        res.redirect('/navigationCV');
      }
    }
  );
});
//navigation job
app.get('/navigationJob', function(req, res) {
  db.get('job').find().then(
    (doc) => {
        res.render(__dirname + "/views/"+'navigationJob.ejs',{joblist:doc});
    }
  );	
});
//recherche job
app.post('/navigationJob/search/',urlencodedParser, function(req, res){
  var response = {
    sectorComp:req.body.sectorComp,
    experienceComp:req.body.experienceComp,
    localisationComp: req.body.locComp
  }
  db.get('job').find(response).then(
    (doc) => {
        res.render(__dirname + "/views/"+'navigationJob.ejs',{joblist:doc});
    }
  );  
}

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