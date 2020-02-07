module.exports = function(app, passport) {
app.get('/contact',isLoggedIn,(req,res)=>{
    res.render('contact.ejs',{message:''});
});

app.get('/about',isLoggedIn,(req,res)=>{
    res.render('about.ejs');
});
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

app.post('/komentar',isLoggedIn,(req,res)=>{
    id=req.body.id;
    ime=req.body.ime;
    email=req.body.email;
    komentar=req.body.komentar;
      var sql =
        "INSERT INTO komentari VALUES (?,?,?,?)";
      connection.query(sql, [id, ime, email, komentar], function(err, result) {
        if (err) throw err;
        console.log("Kontaktirao korsnik: "+ime);
        return res.render('contact.ejs',{message:'Uspesno ste nas kontaktirali!'});
      });
        });

 app.get('/', function(req, res){
  res.render('login.ejs',{message:req.flash('loginMessage')});
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/index',
  failureRedirect: '/login',
  failureFlash: true
 })
);

 app.get('/register', function(req, res){
  res.render('register.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/register',
  failureFlash: true
 }));

 app.get('/index', isLoggedIn, function(req, res){
  res.render('index.ejs',{message:req.flash('loginMessage')});
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
};


function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();
else{
    res.redirect('/');    
}

}