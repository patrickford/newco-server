"use strict";

// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const {DATABASE_URL, PORT, JWT_SECRET, JWT_EXPIRY} = require('./config');
// const {router: usersRouter} = require('./users');
// const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');
// const {router: videosRouter, Videos} = require('./videos');

const app = express();

mongoose.Promise = global.Promise;

// Set /public directory as static web server
//app.use(express.static('client/public'));
app.use(morgan('common'));
app.use(bodyParser.json());

// app.use('/videos', videosRouter);
// app.use('/users/', usersRouter);
// app.use('/auth/', authRouter);

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

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found, you idiot'});
});

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};