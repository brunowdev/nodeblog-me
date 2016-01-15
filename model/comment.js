var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    body: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    },
    date: {
        type: Date, default: Date.now

    }
});

var Post = module.exports = mongoose.model('Comment', CommentSchema);