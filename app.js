var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var flash = require('connect-flash');
var db = require('./model/db.js');
var routes = require('./routes/index');
var posts = require('./routes/posts');
var categories = require('./routes/categories.js');
var config = require('./config.js');
var app = express();

app.locals.moment = require('moment');

app.locals.truncateText = function (text, length) {
    
    if (text.length > 400) {
        var truncateText = text.substring(0, length);
        return truncateText;
    } else {
        return text;
    } 
};

// view engine setup app.set('views', path.join(__dirname, 'views') )

app.set('view engine', 'jade');

// Handle file uploads
var upload = multer({
    dest: './public/uploads'
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Handle Express Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Validator
app.use(expressValidator({
    
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        
        while (namespace.length) {
            formParam = '[' + namespace.shift() + ']';
        }
        
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

// Flash messages
app.use(flash());
app.use(function (request, response, next) {
    response.locals.messages = require('express-messages')(request, response);
    next();
});

// Acess database in any route
app.use(function (request, response, next) {
    request.db = db;
    console.log(request.db)
    console.log('DB was add on the request')
    next();
});

app.use('/', routes);
app.use('/posts', posts);
app.use('/categories', categories);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.listen(config.port);