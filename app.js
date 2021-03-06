var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./modules/db');
// var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res, next) {
  res.render('index', { title: 'Express' });
})
app.get("/lien-he", function (req, res, next) {
  res.render('contact', { title: 'Express' });
})
app.get("/gioi-thieu", function (req, res, next) {
  res.render('about', { title: 'Express' });
})
app.post('/send-email', function (req, res, next) {
  const email = req.body['email'];
  const phone = req.body['phone'];
  const name = req.body['name'];
  db.sendEmail(name,phone,email).then(result => {
    res.status(200).send();
  }).catch(() => res.status(400).send());
})
app.get('/email', function (req, res, next) {
  db.getEmail().then(result => {
    console.log(result);
    res.render('email',{
      thongtin:result
    });
  }).catch(() => res.status(400).send());
})

app.post('/contact', function (req, res, next) {
  // const name = req.body['name'],email = req.body['email'],message = req.body['message'];
})
// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
