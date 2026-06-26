const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST api/ai/crop-advisor
// @desc    Get AI crop recommendation based on soil and climate
// @access  Private
exports.getCropAdvice = async (req, res) => {
  try {
    const { n, p, k, temp, humidity, rainfall, soilType, waterAvailability } = req.body;

    const prompt = `You are an expert agricultural advisor for Indian farmers. Based on the following soil and climate data, recommend the most suitable crop.

Soil Nutrients: N=${n}, P=${p}, K=${k} kg/ha
Climate: Temperature=${temp}°C, Humidity=${humidity}%, Rainfall=${rainfall}mm
Soil Type: ${soilType}
Water Availability: ${waterAvailability}

Respond ONLY in this JSON format (no markdown, no explanation):
{
  "recommendedCrop": "string",
  "expectedYield": "string (e.g. 2-3 tonnes per acre)",
  "riskLevel": "low|medium|high",
  "profitPotential": "string (e.g. ₹40,000 - ₹60,000 per acre)",
  "description": "string (2 sentences max)",
  "fertilizerAdvice": "string (1-2 sentences)",
  "alternativeCrops": ["crop1", "crop2", "crop3"]
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown from the response
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const adviceData = JSON.parse(cleanJsonString);

    res.json(adviceData);
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    res.status(500).json({ message: 'Failed to generate AI advice' });
  }
};

// @route   POST api/ai/chat
// @desc    Chat with Naturo Assistant
// @access  Private
exports.chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Convert frontend history format to Gemini format
    const formattedHistory = history ? history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })) : [];

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
      systemInstruction: {
        parts: [{ text: "You are NaturoCrop's Naturo Assistant, an expert in Indian agriculture. Answer farming questions in simple English or Hinglish. Be concise and practical." }]
      }
    });

    const result = await chat.sendMessage(message);
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error('Gemini Chat Error:', err.message);
    res.status(500).json({ message: 'Failed to communicate with Naturo Assistant' });
  }
};
