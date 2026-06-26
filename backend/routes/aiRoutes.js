const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const aiController = require('../controllers/aiController');

router.post('/crop-advisor', auth, aiController.getCropAdvice);
router.post('/chat', auth, aiController.chat);

module.exports = router;
