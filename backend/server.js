const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('NaturoCrop AI/Weather API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
