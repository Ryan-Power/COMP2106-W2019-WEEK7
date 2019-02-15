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
  Class.findById(req.params.id).then(_class => {
    // const students = _class.students;
    _class.students.push(req.body);

    _class.save(err => {
      if (err) return next(err);

      return res.redirect(`/classes/view/${req.params.id}`);
      // console.log()
    });
  });
});

module.exports = router;
