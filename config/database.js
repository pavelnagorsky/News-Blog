const mongoose = require('mongoose');

module.exports = function () {
	var db = mongoose.connect(process.env.DBURL, { useNewUrlParser: true, 
												   useUnifiedTopology: true,
												 });
	require('../models/user');
	require('../models/post');
	require('../models/comment');
	
	return db;
};