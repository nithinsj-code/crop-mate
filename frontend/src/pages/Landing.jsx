import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A2D] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Smart Farming Starts Here
          </h1>
          <p className="text-xl sm:text-2xl mb-10 text-green-100 max-w-3xl mx-auto">
            Get AI-powered crop recommendations, track your farm, and access government schemes — all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <a 
              href="#features" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#1B4332] font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around text-center gap-4">
          <div>
            <div className="text-2xl font-bold text-[#2D6A2D]">10,000+</div>
            <div className="text-gray-600 font-medium">Farmers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#2D6A2D]">50+</div>
            <div className="text-gray-600 font-medium">Crops Supported</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#2D6A2D]">100%</div>
            <div className="text-gray-600 font-medium">Free to Use</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1B4332] text-white py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold">CropMate</span>
        </div>
        <p className="text-green-200">© 2026 CropMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
