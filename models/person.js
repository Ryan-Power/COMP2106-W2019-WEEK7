const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Program = require('./program'); // Require in Program model

const Person = new Schema({
  firstName: String,
  lastName: String,
  studentNumber: Number,
  program: Program // Referenes Program model
});

// Export model of our class Schema
module.exports = mongoose.model('Person', Person);
