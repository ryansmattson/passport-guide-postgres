var router = require('express').Router();
var passport = require('passport');

router.get('/', function(req, res){
  console.log(req.user);
  res.send(req.isAuthenticated());  //talking to express session to see if it exists
});

router.post('/', passport.authenticate('local', {
  successRedirect: 'views/success.html',
  failureRedirect: 'views/failure.html'
}));


module.exports = router;
