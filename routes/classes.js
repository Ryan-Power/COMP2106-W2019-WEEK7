const express = require('express');
const router = express.Router();

// GET /classes
router.get('/', (req, res, next) => {
  res.render('classes/list', {});
});

// GET /classes/create
router.get('/create', (req, res, next) => {
  res.render('classes/create', {});
});

// FORM SUBMISSION for /classes/create
router.post('/create', (req, res, next) => {
  const submittedClass = req.body;

  res.render('classes/create', {});
});

module.exports = router;
