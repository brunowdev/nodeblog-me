var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    author: {
        type: String
    },
    body: {
        type: String
    },
    date: {
         type: Date, default: Date.now
    
    }
});

var Post = module.exports = mongoose.model('Post', PostSchema);