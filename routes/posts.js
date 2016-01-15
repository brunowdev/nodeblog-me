var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        })
    }
});

var upload = multer({ storage: storage });
//var upload = multer({ dest: './uploads' });
var Post = require('../model/post');
var Category = require('../model/category');
var Comment = require('../model/comment');

/* GET users listing. */
router.get('/add', function (req, res, next) {
    
    var categories = {};
    
    Category.find({}, {}, function (error, categories) {
        res.render('addpost', { "title" : "Add Post", "categories": categories });
    });

});

router.get('/show/:id', function (req, res, next) {
    
    var post = {};
    var comments = {};
    
    Post.findById(req.params.id, function (error, post) {
        
        Comment.find({ post: post._id }, {}, function (error, comments) {
            res.render('show', { "title" : "View Post", "post": post , "comments": comments });
        });
        
       
    });

});

router.post('/addcomment', function (request, response, next) {
    
    var comment = new Comment({
        name: request.body.name,
        email: request.body.email,
        body: request.body.body,
        post: request.body.postid,
        date: new Date()
    });
    
    // TODO Form validations
    
    if (2 === 3) {
       
    } else {
        
        comment.save(function (error) {
            
            if (error) {
                request.send('There is an error...');
            } else {
                request.flash('success', 'Comment Submitted');
                response.location('/');
                response.redirect('/');
            }
        });
    }

});

router.post('/add', upload.single('mainimage'), function (request, response, next) {
    
    var post = new Post({
        title: request.body.title,
        category: request.body.category,
        author: request.body.author,
        body: request.body.body,
        date: new Date()
    });
    
    console.log(request.file);
    
    // If there is a file 
    if (request.file) {
        console.log('Enviando um arquivo...');
        var imagemName = request.file.filename;
        var imagemNomeOriginal = request.file.originalname;
        var imagemMime = request.file.mimetype;
        var imagemCaminho = request.file.path;
        var imagemExt = request.file.extension;
        var imagemTamanhoBytes = request.file.size;

    } else {
        // Seta uma imagem padrao
        var imagemName = 'noimage.png';
    }
    
    post.image = imagemName;
    
    // Form validation
    request.checkBody('title', 'Title field is required').notEmpty();
    request.checkBody('body', 'Body field is required').notEmpty();
    
    var errors = request.validationErrors();
    
    if (errors) {
        response.render('addpost', { "errors": errors, "title": post.title, "body": post.body , "categories": "" });
    } else {
        
        post.save(function (error) {
            
            if (error) {
                request.send('There is an error...');
            } else {
                request.flash('success', 'Post Submitted');
                response.location('/');
                response.redirect('/');
            }
        });


    }

});






module.exports = router;
