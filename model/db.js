// Bring Mongoose into the app
var mongoose = require('mongoose');

// Build the connection string
var dbURI = 'mongodb://admin:c31096ce-5f50-4036-a54a-19afa4b6349e@ds029117.mongolab.com:29117/nodeblogme';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


// BRING IN YOUR SCHEMAS & MODELS
// For example

require('./post.js');
require('./category.js');
require('./comment.js');