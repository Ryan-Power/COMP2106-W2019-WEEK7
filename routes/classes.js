const express = require('express');
const router = express.Router();
const Class = require('../models/class');

// GET /classes
router.get('/', (req, res, next) => {
  Class.find().then(classes => {
    console.log(classes.length);
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

module.exports = router;
