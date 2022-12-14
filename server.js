const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const route = require('./Routes/routes')

require('dotenv').config()
// Connect to the database

require('./config/db');


const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.json());

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));


const PORT = process.env.PORT || 8000;

//SETTING HEADER FOR ACCESS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, CREATE, DELETE, DESTROY');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Body Parser Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));



app.use(route);




app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});