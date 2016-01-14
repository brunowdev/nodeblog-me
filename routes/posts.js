var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var Post = require('../model/post');
var Category = require('../model/category');

/* GET users listing. */
router.get('/add', function (req, res, next) {
    
    var categories = {};
    
    Category.find({}, {}, function (error, categories) {
        res.render('addpost', { "title" : "Add Post", "categories": categories });
    });

});

router.post('/add', upload.single('mainimage'), function (request, response, next) {
    
    var post = new Post({
        title: request.body.title,
        category: request.body.category,
        author: request.body.author,
        body: request.body.body,
        date: new Date()
    });
    
    // If there is a file 
    if (request.file) {
        
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


// Get form values


});


module.exports = router;
