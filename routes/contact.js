const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contact', { title: 'The Quantum Guys: Contact' });
});

module.exports = router;
