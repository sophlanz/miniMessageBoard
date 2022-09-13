//express imports
var createError = require('http-errors');
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
//import  models
require('./models/Users');
require('./middleware/auth');
//import cors
var cors = require('cors');
app.use(cors());
//import db
const dbConnect = require('./config/database')
dbConnect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//passport setup
const Users = require('./models/Users');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const secret = process.env.SECRET;
app.use(require('express-session')({
  secret: secret,
  saveUninitialized: true,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy (Users.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
//import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//routes
app.use('/', indexRouter);
app.use('/', usersRouter);
//override method for submit form request "patch"
var methodOverride = require('method-override');
app.use(methodOverride('_method'))

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
