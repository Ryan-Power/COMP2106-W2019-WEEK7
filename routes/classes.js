const express = require('express');
const router = express.Router();

// GET /classes
router.get('/', (req, res, next) => {
  res.render('classes/list', {});
});

module.exports = router;
