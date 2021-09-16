const passport 				= require('passport'),
	  localStrategy			= require('passport-local'),
	  passportLocalMongoose = require('passport-local-mongoose'),
	  User 					= require('mongoose').model("User");	

// LOCAL STRATEGY
module.exports = function () {
	passport.use(new localStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
};