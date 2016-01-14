var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    title: {
        type: String
    }
});

var Post = module.exports = mongoose.model('Category', CategorySchema);