const express = require('express');
const Ninja = require('../models/post');
const router = express.Router();

// Get all posts
router.get('/posts', function(req,res,next){
	Ninja.find({}).then(function(ninja){
	  res.send(ninja);
	});
});

// Get posts by ID
router.get('/post/:id', function(req,res,next){
	Ninja.findOne({_id: req.params.id}).then(function(ninja){
	  res.send(ninja);
	});
});

// Create a Post
router.post('/post', function(req,res,next){
	Ninja.create(req.body).then(function(ninja){
	  res.send(ninja);
	}).catch(next);
});

// Update a Post
router.put('/post/:id', function(req,res,next){
	Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ninja){
	  Ninja.findOne({_id: req.params.id}).then(function(ninja){
	    res.send(ninja);
	  });
	});
});

// Delete a Post
router.delete('/post/:id', function(req,res,next){
	Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
	  res.send(ninja);
	});
});

module.exports = router;
