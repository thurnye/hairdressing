const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config()
// Connect to the database
require('./config/db');


const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
// if the user types localhost: 4000/api we shld be redirected to router
app.use('/api', require('./router/router'))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

