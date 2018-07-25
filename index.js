const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const mongoose = require('mongoose');


// set up express app
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/nodeapp');

// register body-parser
app.use(bodyParser.json());

// Register routes
app.use('/api', routes);

// Error handling middleware
app.use(function(err,req,res,next){
	res.status(422).send({error: err.message});
});

// listen for request
app.listen(process.env.port || 80, function(){
	console.log('now listening for request');
});
