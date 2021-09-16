const Post		 = require('../models/post'),
	  Comment 	 = require('../models/comment');

// MIDDLEWARE

var middlewareObj = {};

middlewareObj.isAdmin = function (req, res, next){
	if (req.isAuthenticated()){
		if (req.user.username === process.env.ADMIN){
			next();
		} else {
			req.flash('error', "You don't have permission to do that");
			res.redirect('back');
		};
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	};
};

middlewareObj.checkPostOwnership = function (req, res, next){
	if (req.isAuthenticated()){
		Post.findById(req.params.id, function(err, post){
			if (err || !post) {
				req.flash('error', 'Post not found');
				res.redirect('back');
			} else {
				if (post.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				};
			};
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	};
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if (req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
			if (err) {
				res.redirect('back');
			} else {
				if (comment.author.id.equals(req.user._id) || middlewareObj.isAdmin){
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				};
			};
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	};
};

middlewareObj.isLoggedIn = function(req,res,next){
	if (req.isAuthenticated()){
		return next()
	}
	req.flash('error', 'You need to be logged in to do that');
	res.redirect('/login');
};

module.exports = middlewareObj;