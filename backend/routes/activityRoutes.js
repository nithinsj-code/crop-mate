const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const activityController = require('../controllers/activityController');

router.get('/', auth, activityController.getActivities);
router.post('/', auth, activityController.addActivity);

module.exports = router;
