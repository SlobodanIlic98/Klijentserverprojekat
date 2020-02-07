var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
 passport.serializeUser(function(user, done){
  done(null, user.id);
 });

 passport.deserializeUser(function(id, done){
  connection.query("SELECT * FROM korisnici WHERE id = ? ", [id],
   function(err, rows){
    done(err, rows[0]);
   });
 });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'email',
   passwordField: 'sifra',
   passReqToCallback: true
  },
  function(req, email, sifra, done){
   connection.query("SELECT * FROM korisnici WHERE email = ? ", 
   [email], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'Email je zauzet'));
    }else{
     var newUserMysql = {
      username: email,
      password: bcrypt.hashSync(sifra)
     };

     var insertQuery = "INSERT INTO korisnici (email, sifra) values (?, ?)";

     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
      function(err, rows){
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql,req.flash('loginMessage','Uspesna registracija! '));
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'email',
   passwordField: 'sifra',
   passReqToCallback: true
  },
  function(req, email, sifra, done){
   connection.query("SELECT * FROM korisnici WHERE email = ? ", [email],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'Ne postoji korisnik'));
    }
    if(!bcrypt.compareSync(sifra, rows[0].sifra))
     return done(null, false, req.flash('loginMessage', 'Pogresna sifra'));

    return done(null, rows[0],req.flash('loginMessage','Dobrodosli !'));
   });
  })
 );
};