const express = require('express');
const Ninja = require('../models/post');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login mockup user for creatin JWT
router.post('/login/', function(req,res){
	// Mock user
	const user = {
		id: 1,
		username: "Galuh",
		email: 'galuhpradipta95@gmail.com'
		}

	jwt.sign({user: user}, 'rahasia', function(err, token){
		res.json({
			token: token
		});
	});
});


// Get all posts
router.get('/posts', function(req,res,next){
	Ninja.find({}).then(function(ninjas){
	  res.send(ninjas);
	});
});

// Get posts by ID
router.get('/post/:id', function(req,res,next){
	Ninja.findOne({_id: req.params.id}).then(function(ninja){
	  res.send(ninja);
	});
});

// Create a Post
router.post('/post', verifyToken, function(req,res,next){
	jwt.verify(req.token, 'rahasia', function(err,authData){
		if(err){
			res.sendStatus(403);
		} else {
			Ninja.create({
				"title": req.body.title,
				"content": req.body.content,
				"author": authData
			}).then(function(ninja){
			res.send(ninja);
			}).catch(next);
		}
	});
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

function verifyToken(req, res, next){
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if token is undefined
	if(typeof bearerHeader !== 'undefined'){
		// Split by space
		const bearer = bearerHeader.split(' ');
		// Get token from second index of array
		const bearerToken = bearer[1];
		// set token
		req.token = bearerToken;
		// Next middleware
		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}

module.exports = router;
