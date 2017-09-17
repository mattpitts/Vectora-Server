const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const router = require('./api/router');
const auth = require('./api/auth')

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.CORS_ORIGIN
}));

app.use('/api/v1', router);
app.use('/api/v1', auth)


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
	  message: err.message,
	  error: req.app.get('env') === 'development' ? err : {}
  });
});
module.exports = app;
