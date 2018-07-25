const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema & model 
const PostSchema = new Schema({
	name: {
	  type: String,
	  required: [true, 'Name field is required']
	},
	body: {
	  type: String
	}
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
