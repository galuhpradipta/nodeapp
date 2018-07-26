const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema & model 
const PostSchema = new Schema({
	title: {
	  type: String,
	  required: [true, 'Name field is required']
	},
	author: {
	  type: String,
	  default: "unknown",
	},
	content: {
	  type: String,
	  required: [true, 'Content field is required']
	},
	created_at: {
	  type: Date,
	  default: Date.now
	},
	categories: {
	  type: String,
	  default: "post"
	}
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
