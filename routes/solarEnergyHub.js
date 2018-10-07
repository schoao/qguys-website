const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('solarEnergyHub', { title: 'The Quantum Guys: Solar Energy Hub' });
});

module.exports = router;
