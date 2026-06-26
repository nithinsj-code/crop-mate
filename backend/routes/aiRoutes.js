const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
router.post('/crop-advisor', aiController.getCropAdvice);
router.post('/chat', aiController.chat);

module.exports = router;
