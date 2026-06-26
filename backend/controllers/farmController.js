const Farm = require('../models/Farm');

// @route   GET api/farms
// @desc    Get all farms for the logged-in user
// @access  Private
exports.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(farms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/farms
// @desc    Add a new farm
// @access  Private
exports.addFarm = async (req, res) => {
  try {
    const { name, location, sizeAcres, soilType, waterSource, primaryCrop } = req.body;

    const newFarm = new Farm({
      userId: req.user.id,
      name,
      location,
      sizeAcres,
      soilType,
      waterSource,
      primaryCrop
    });

    const farm = await newFarm.save();
    res.json(farm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT api/farms/:id
// @desc    Update a farm
// @access  Private
exports.updateFarm = async (req, res) => {
  try {
    let farm = await Farm.findById(req.params.id);

    if (!farm) return res.status(404).json({ message: 'Farm not found' });

    // Make sure user owns farm
    if (farm.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    farm = await Farm.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(farm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE api/farms/:id
// @desc    Delete a farm
// @access  Private
exports.deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (!farm) return res.status(404).json({ message: 'Farm not found' });

    // Make sure user owns farm
    if (farm.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await farm.deleteOne();

    res.json({ message: 'Farm removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
