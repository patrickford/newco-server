"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Set /public directory as static web server
app.use(express.static('client/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
})

app.get('/echo/:what', (req, res) => {
  let resObj = {}
  resObj.host = req.headers.host;
  resObj.query = req.query;
  resObj.params = req.params;
  res.status(200).json(resObj);
})

// Listen for events on port 8080 of localhost
app.listen(8080, () => console.log('Listening on port 8080'));
