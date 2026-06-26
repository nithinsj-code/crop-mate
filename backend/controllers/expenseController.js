const Expense = require('../models/Expense');

// @route   GET api/expenses
// @desc    Get all expenses for the logged-in user
// @access  Private
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id })
                                  .populate('farmId', 'name')
                                  .sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/expenses/summary
// @desc    Get expense summary for the logged-in user
// @access  Private
exports.getExpenseSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    
    let total = 0;
    const categoryBreakdown = {
      seeds: 0,
      fertilizer: 0,
      labor: 0,
      equipment: 0,
      water: 0,
      other: 0
    };

    expenses.forEach(expense => {
      total += expense.amount;
      if (categoryBreakdown[expense.category] !== undefined) {
        categoryBreakdown[expense.category] += expense.amount;
      }
    });

    res.json({
      total,
      breakdown: categoryBreakdown
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/expenses
// @desc    Add a new expense
// @access  Private
exports.addExpense = async (req, res) => {
  try {
    const { farmId, date, category, amount, notes } = req.body;

    const newExpense = new Expense({
      userId: req.user.id,
      farmId,
      date,
      category,
      amount,
      notes
    });

    const expense = await newExpense.save();
    
    await expense.populate('farmId', 'name');

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
