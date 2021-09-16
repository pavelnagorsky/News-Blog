const passport 	= require('passport'),
	  mongoose	= require('mongoose');

// STRATEGY
module.exports = function () {
	localStrategy = require('./strategies/local')();
};