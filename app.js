var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes = require('./config/routes');
var mongoose = require('mongoose');
var app = express();

// Connect to mongoose
mongoose.connect(
  'mongodb://user:password1@ds151293.mlab.com:51293/comp2106-week6',
  {
    useNewUrlParser: true
  }
);

// Grab mongoose connection to 'listen' to error/open events
var db = mongoose.connection;

// When DB emits an 'error' console log the error
db.on('error', console.error.bind(console, 'Connection Error'));

// When DB emits 'open' console log connected only 1 time
db.once('open', function(callback) {
  console.log('Connected to mongodb');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Loop over each route in our config
routes.forEach(function(route) {
  // Use each route using path and controller
  app.use(route.path, route.controller);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
