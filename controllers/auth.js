const express = require('express');
const db = require('../models');
const router = express.Router();
const passport = require('../config/passportConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});
router.post('/signup',function(req,res){
  db.user.findOrCreate({
    where:{email:req.body.email},
    defaults:{
      name: req.body.name,
      password :req.body.password
    }
  }).spread(function(user,created){
    if (created){
      console.log('user was created ,not found');
      passport.authenticate('local',{
        successRedirect:'/'
      })(req.res);
      //IIFE imediately invoked funtion expression
      
    }else{
      console.log('email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error){
    console.log('Error:',error.message);
    res.redirect('/auth/signup')
  })
})

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login' ,passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/auth/login'
}));

module.exports = router;
