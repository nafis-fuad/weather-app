"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));


app.set('port', (process.env.PORT || 3000));

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


const mainRoutes = require("./routes/index");
app.use(mainRoutes);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});