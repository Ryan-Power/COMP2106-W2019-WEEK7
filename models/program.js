const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Program = new Schema({
  name: String,
  code: String
});

// Export model of our class Schema
module.exports = mongoose.model('Program', Program);
