const Activity = require('../models/Activity');

// @route   GET api/activities
// @desc    Get all activities for the logged-in user
// @access  Private
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id })
                                     .populate('farmId', 'name')
                                     .sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/activities
// @desc    Add a new activity
// @access  Private
exports.addActivity = async (req, res) => {
  try {
    const { farmId, date, type, notes } = req.body;

    const newActivity = new Activity({
      userId: req.user.id,
      farmId,
      date,
      type,
      notes
    });

    const activity = await newActivity.save();
    
    // Populate the farmId field before returning to match GET request format
    await activity.populate('farmId', 'name');
    
    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
