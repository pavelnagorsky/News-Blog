const express    	 = require ('express'),
	  bodyParser	 = require('body-parser'),
	  flash			 = require('connect-flash'),
	  methodOverride = require('method-override'),
	  passport  	 = require('passport'),
	  session 		 = require('express-session'),
	  moment		 = require('moment');
const User = require("../models/user");

module.exports = function () {
	// APP CONFIG
	const app = express();
	app.use(bodyParser.urlencoded({extended: true}));
	app.set('view engine', 'ejs');
	app.use(methodOverride('_method'));
	app.use(flash());
	
	// STATIC DIRECTORY
	app.use(express.static('./public'));

	// REQURING MOMENT
	app.locals.moment = moment;
	
	// SESSION CONFIG
	app.use(require('express-session')({
		secret: 'hello',
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	
	// MIDDLEWARE
	app.use(function(req,res,next){
		res.locals.currentUser = req.user;
		res.locals.adminUsername = process.env.ADMIN;
		res.locals.error = req.flash('error');
		res.locals.success = req.flash('success');
		next();
	});
	
	// REQURING ROUTES
	const postRoutes 	= require('../routes/posts'),
		  commentRoutes	= require('../routes/comments'),
		  indexRoutes  	= require('../routes/index');

	// ROUTES
	app.use(indexRoutes);
	app.use('/posts', postRoutes);
	app.use('/posts/:id/comments', commentRoutes);

	app.get('*', function(req,res){
		res.redirect('/posts');
	});
	
	return app;
};	