const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const expenseController = require('../controllers/expenseController');

router.get('/', auth, expenseController.getExpenses);
router.get('/summary', auth, expenseController.getExpenseSummary);
router.post('/', auth, expenseController.addExpense);

module.exports = router;
