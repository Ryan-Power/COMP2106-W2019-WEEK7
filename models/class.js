const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
  name: String,
  courseCode: String,
  term: String,
  students: [Person], // Array of References Person Model
  instructors: [Person] // Array of References Person Model
});

// Export model of our class Schema
module.exports = mongoose.model('Class', Class);
