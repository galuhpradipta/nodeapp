const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create comment schema & model 
const CommentSchema = new Schema({
	postid: {
	  type: String,
	},
	author: {
	  type: Array
	},
	content: {
	  type: String
	},
	created_at: {
	  type: Date,
	  default: Date.now
	},
	parentId: {
	  type: String,
	}
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
