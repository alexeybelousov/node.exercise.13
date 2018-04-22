const express = require('express');
const bodyParset = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://user:1111@ds249839.mlab.com:49839/node_exercise_13';

const app = express();

app.use(bodyParset.json());

MongoClient.connect(url, (err, client) => {
  if (err) throw err;
  require('./routes')(app, client);
  app.listen(3000, () => console.log('Server has been run on 3000 port'));
});
