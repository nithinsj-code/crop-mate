import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Axios instance for calling our backend Gemini and Weather APIs
// We removed the JWT interceptor since Supabase handles all data auth directly

export default api;
