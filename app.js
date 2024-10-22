var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member.route');
var brandRouter = require('./routes/brand.route');
var watchRouter = require('./routes/watch.route');
var authRouter = require('./routes/auth');
var pathRoute = require('./routes/page.route');
var cookieParser = require('cookie-parser');
var app = express();
var cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/api/members', memberRouter);
app.use('/api/auth', authRouter);
app.use('/api/brands', brandRouter);
app.use('/api/watches', watchRouter);
app.use('/page/', pathRoute);
const { MongoClient, ServerApiVersion } = require('mongodb');
const connectDB = require('./config/connectDB');
// connect db

// const connect = mongoose.connect(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
connectDB();

// connect.then((db)=>{
//   console.log("Connect Successfully!")
// }, (err)=>{console.log("err: ", err)})

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
  res.render('error', { message: err.message });
});



module.exports = app;
