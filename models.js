'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CitiesSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true
  }
});


const Cities = mongoose.models.Cities || mongoose.model('Cities', CitiesSchema);

module.exports = { Cities };