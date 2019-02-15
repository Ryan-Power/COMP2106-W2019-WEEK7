const express = require('express');
const router = express.Router();
const Class = require('../models/class');

// GET /classes
router.get('/', (req, res, next) => {
  Class.find().then(classes => {
    res.render('classes/list', { classes });
  });
});

// GET /classes/create
router.get('/create', (req, res, next) => {
  res.render('classes/create', {});
});

// FORM SUBMISSION for /classes/create
router.post('/create', (req, res, next) => {
  const newClass = new Class(req.body);
  newClass.save(err => {
    if (err) return next(err);

    res.redirect('/classes');
  });
});

// Viewing a specific class by it's id
router.get('/view/:id', (req, res, next) => {
  // Using Mongoose find out class by it's ID
  Class.findById(req.params.id).then(_class => {
    res.render('classes/view', { _class });
  });
});

router.post('/view/:id/student', (req, res, next) => {
  // Find class by it's ID in URL
  Class.findById(req.params.id).then(_class => {
    // Because students is an array, we use push to create a new student
    _class.students.push(req.body);

    // Save class
    _class.save(err => {
      if (err) return next(err);

      return res.redirect(`/classes/view/${req.params.id}`);
    });
  });
});

router.get('/view/:id/student/delete/:studentId', (req, res, next) => {
  // Find class by it's ID in URL
  Class.findById(req.params.id).then(_class => {
    // Filter out the student with the ID matching studentId
    const studentId = req.params.studentId;

    _class.students = _class.students.filter(
      student => student.id !== studentId
    );

    // Save class
    _class.save(err => {
      if (err) return next(err);

      return res.redirect(`/classes/view/${req.params.id}`);
    });
  });
});

module.exports = router;
