var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');
var brandRouter = require('./routes/brand.route');
var watchRouter = require('./routes/watch.route');
var authRouter = require('./routes/auth');
var cookieParser = require('cookie-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/members', memberRouter);
app.use('/auth', authRouter);
app.use('/brand', brandRouter);
app.use('/watch', watchRouter);
// connect db
const url = "mongodb://localhost:27017/sdn-assignment"
const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connect Successfully!")
}, (err)=>{console.log("err: ", err)})

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
