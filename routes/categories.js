var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), Category = mongoose.model('Category');

var Post = require('../model/post');

router.get('/show/:category', function (req, res, next) {
    
    Post.find({ category: req.params.category }, {}, function (error, posts) {
        res.render('index', { "title" : req.params.category, "posts": posts });
    });
    
});

router.get('/add', function (req, res, next) {
    res.render('categories', { title: 'Add Category' });
});

router.post('/add', function (request, response, next) {
    
    var category = new Category({
        title: request.body.title
    });
    
    
    // Form validation
    request.checkBody('title', 'Title field is required').notEmpty();
    
    var errors = request.validationErrors();
    
    if (errors) {
        response.render('categories', { "errors": errors, "title": category.title });
    } else {
        
        category.save(function (error) {
            
            if (error) {
                request.send('There is an error...');
            } else {
                request.flash('success', 'Category saved');
                response.location('/');
                response.redirect('/');
            }
        });


    }


// Get form values


});

module.exports = router;


