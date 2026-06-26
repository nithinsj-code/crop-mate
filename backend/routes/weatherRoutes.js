const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const weatherController = require('../controllers/weatherController');

router.get('/', auth, weatherController.getWeather);

module.exports = router;
