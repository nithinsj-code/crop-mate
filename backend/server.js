const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/farms', require('./routes/farmRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('CropMate API is running');
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
