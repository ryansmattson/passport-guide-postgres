var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy();

var app = express();

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        secure: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        User.findAndComparePassword(username, password, function(err, isMatch, user) {
            if (err) {
                return done(err);
            }

            if (isMatch) {
                //successfully auth the user
                return done(null, user);
            } else {
                done(null, false);
            }
        });
    }));


//converts user to user id
passport.serializeUser(function(user, done){
  done(null, user.id);
});

//converts user id to user
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      return done(err);
    }
    done(null, user);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urllencoded({
    extended: true
}));
app.use(express.static('public'));

app.get('/', function(req, res){
  response.sendFile(path.join(__dirname, 'public/views/login.html'));
})

app.use('/login', login);
app.use('/register', register);


var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Listening on port ', 3000);
})
