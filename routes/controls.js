const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('controls', { title: 'The Quantum Guys: Controls' });
});

module.exports = router;
