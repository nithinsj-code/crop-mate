const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const farmController = require('../controllers/farmController');

router.get('/', auth, farmController.getFarms);
router.post('/', auth, farmController.addFarm);
router.put('/:id', auth, farmController.updateFarm);
router.delete('/:id', auth, farmController.deleteFarm);

module.exports = router;
