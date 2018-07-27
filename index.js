const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
//const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
	
// set up express app
const app = express();

// set up swagger-ui for documentaion
const swaggerDocument = require('./swagger.json');

// Connect to mongodb
mongoose.connect('mongodb://localhost/nodeapp');

// register body-parser
app.use(bodyParser.json());

// Register routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

// Error handling middleware
app.use(function(err,req,res,next){
	res.status(422).send({error: err.message});
});

// listen for request
app.listen(process.env.port || 80, function(){
	console.log('now listening for request');
});
