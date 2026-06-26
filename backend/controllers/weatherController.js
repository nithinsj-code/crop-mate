const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   GET api/weather
// @desc    Get weather for a location (lat, lon) and AI advice
// @access  Private
exports.getWeather = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Call Open-Meteo API
    // Fetch current weather and 5-day daily forecast
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`;
    
    const weatherRes = await axios.get(weatherUrl);
    const data = weatherRes.data;

    const current = {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      rainfall: data.current.precipitation,
      windSpeed: data.current.wind_speed_10m
    };

    // Use Gemini to generate a 1-line farming advice based on current weather
    const prompt = `The current weather at a farm is: Temperature ${current.temperature}°C, Humidity ${current.humidity}%, Rainfall ${current.rainfall}mm, Wind Speed ${current.windSpeed}km/h. Give a 1-line practical farming advice for Indian farmers based on this weather.`;
    
    let advice = "Weather looks good for general farming activities.";
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const aiResult = await model.generateContent(prompt);
      advice = aiResult.response.text().trim();
    } catch (aiErr) {
      console.error('Gemini weather advice error:', aiErr.message);
      // Fallback advice already set
    }

    res.json({
      current,
      daily: data.daily,
      advice
    });

  } catch (err) {
    console.error('Weather API Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
};
