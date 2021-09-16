const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: String,
	image: String,
	description: String,
	topic: String,
	views: { type: Number , default: 0},
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

module.exports = mongoose.model('Post', postSchema);