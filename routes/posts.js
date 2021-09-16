const express 	 = require('express'),
	  router     = express.Router(),
	  Post		 = require('../models/post'),
	  Comment	 = require("../models/comment"),
	  middleware = require('../middleware/index');

// POSTS ROUTES

// SHOW POSTS
router.get('/', function(req,res){
	Post.find({}, function(err, allPosts){
		if (err) {
			console.log(err);
			req.flash('error', 'some database problem has occured');
		} else {
			res.render('posts/index',{posts: allPosts, page: 'posts'});
		};
	});
});	

// POST NEW
router.get('/new', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	res.render('posts/new', {page: 'newPost'});
});

// POST CREATE
router.post('/', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	var title = req.body.title;
	var image = req.body.image;
	var description = req.body.description;
	var topic = req.body.topic;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newPost = {title: title, image: image, description: description, topic: topic, author: author};
	Post.create(newPost, function(err, newlyCreated){
		if (err){
			console.log(err);
		} else {
			console.log(newlyCreated);
			req.flash('success', 'Successfully created post');
			res.redirect('/posts');
		};
	});
});

// SHOW POST
router.get('/:id', function(req,res){
	Post.findById(req.params.id).populate('comments').exec(function(err, foundPost){
		if (err || !foundPost){
			req.flash('error', 'Post not found');
			res.redirect('back');
		} else {
			var thisTopic = foundPost.topic;
			Post.find({topic: thisTopic}, function(err, featuredNews){
				if (err){
					console.log(err)
				} else {
					foundPost.views++;
					foundPost.save();
					res.render('posts/show', {post: foundPost, featuredNews: featuredNews});
				}
			});	
		};
	});
});

// POST EDIT
router.get('/:id/edit', middleware.isAdmin, middleware.checkPostOwnership, function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		res.render('posts/edit', {post: foundPost});
	});	
});

// POST UPDATE
router.put('/:id', middleware.isAdmin, middleware.checkPostOwnership, function(req,res){
	Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Successfully updated post');
			res.redirect('/posts/' + req.params.id);
		};	
	});
});

// DELETE - removes post and it's comments from the database
router.delete('/:id', middleware.isAdmin, middleware.checkPostOwnership, function(req,res){
	Post.findById(req.params.id, function(err, foundPost){
		foundPost.comments.forEach(function(foundComment){
			Comment.findByIdAndRemove(foundComment._id, function(err, deletedComment){
				if (err){
					console.log(err);
					res.redirect('back');
				} 
			});
		});
	});
	Post.findByIdAndRemove(req.params.id, function(err, deletedPost){
		if (err) {
			res.redirect('/posts');
		} else {
			req.flash('success', 'Successfully removed post');
			res.redirect('/posts');
		};	
	});
});

module.exports = router;