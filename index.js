'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Cities } = require('./models.js');
const testData = require('./test-data');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cities', (req, res) => {
  Cities
    .find()
    .then(cities =>
      res.status(200).json(cities))
    .catch(() => {
      res.status(500).json({ error: 'Something went wrong' });
    });

});

app.post('/api/cities', jsonParser, (req, res) => {
console.log(req.body);

  // Cities.insertMany({cities: req.body}, (error) => {
  //   if (error) {
  //     res.send(error);
  //   }
  // });


  for (let i = 0; i < req.body.length; i++) {

    Cities.create({city: req.body[i].city, state: req.body[i].state}, (err, user) => {
      if (err)
        res.send(err);
    });
  }
  res.json({saved: true});
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
