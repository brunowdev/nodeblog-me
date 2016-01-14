var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res, next) {
    Post.find({}, {}, function (error, posts) {
        console.log(posts);
        res.render('index', { "posts": posts, title: 'BlOg-me Home' });
    });
});

module.exports = router;
