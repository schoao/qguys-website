


const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var expressGoogleAnalytics = require('express-google-analytics');
var analytics = expressGoogleAnalytics('UA-121802688-1');
var dotenv = require('dotenv').config();

const indexRoute = require('./routes/index');
const contactRoute = require('./routes/contact');
const solarEnergyHubRoute = require('./routes/solarEnergyHub');
const controlsRoute = require('./routes/controls');

const app = express();

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(analytics);
app.use('/', indexRoute);
app.use('/contact', contactRoute);
app.use('/solarEnergyHub', solarEnergyHubRoute);
app.use('/controls', controlsRoute);

var mailOptions = {
  from: 'thequantumguys2018@gmail.com', // sender address
  to: 'thequantumguys2018@gmail.com', // list of receivers
  subject: 'Interest Query', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

app.post('/contact', function(req, res)
{
  mailOptions.html = '<p>'+ 'Name: ' + req.body.name + '</p>'
  mailOptions.html = mailOptions.html + '<p>'+ 'Email: ' + req.body.email + '</p>'
  mailOptions.html = mailOptions.html + '<p>'+ 'Mobile: ' + req.body.mobile + '</p>'
  mailOptions.html = mailOptions.html + '<p>'+ 'Subject: ' + req.body.subject + '</p>'
  mailOptions.html = mailOptions.html + '<p>'+ 'Message: ' + req.body.message + '</p>'
  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });

  res.redirect('/');
  return;
});


var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'thequantumguys2018@gmail.com',
        pass: process.env.QGUY_EMAIL_KEY
    }
});
/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

module.exports = app;
