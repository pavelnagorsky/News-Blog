const express 	 = require('express'),
	  router     = express.Router(),
	  passport   = require('passport'),
	  Post 		 = require('../models/post'),
	  Comment 	 = require('../models/comment'),
	  User 		 = require('../models/user'),
	  middleware = require('../middleware/index');

// 	AUTH ROUTES

// REGISTER FORM
router.get('/register', function(req,res){
	res.render('register', {page: 'register'});
});

// REGISTER
router.post('/register', function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			return res.render('register', {error: err.message});
		}	
		passport.authenticate('local')(req,res,function(){
			req.flash('success', 'Welcome to NewsBlog, ' + user.username);
			res.redirect('/posts');
		});
	});
});

// LOGIN FORM
router.get('/login', function(req,res){
	res.render('login', {page: 'login'});
});

// LOGIN
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/posts',
		failureRedirect:  '/login',
		failureFlash: true,
	}), function(req,res){
});

// LOGOUT
router.get('/logout', function(req,res){
	req.logout();
	req.flash('success', "Logged you out");
	res.redirect('/posts');
});

module.exports = router;