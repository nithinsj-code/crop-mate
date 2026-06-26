import React from 'react';
import { Sprout, Map, ClipboardList, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <Link to="/dashboard/farms" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-[#2D6A2D] rounded-lg">
              <Map size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">My Farms</p>
              <p className="text-2xl font-bold text-gray-900">Manage</p>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/activities" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Activities</p>
              <p className="text-2xl font-bold text-gray-900">Track</p>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/expenses" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Finances</p>
              <p className="text-2xl font-bold text-gray-900">Review</p>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/ai-advisor" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Sprout size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">AI Advisor</p>
              <p className="text-2xl font-bold text-gray-900">Ask AI</p>
            </div>
          </div>
        </Link>

      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to NaturoCrop! 🌾</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your complete digital farming companion. Use the sidebar to navigate through your farms, log daily activities, track expenses, or ask the AI Advisor for expert recommendations.
        </p>
      </div>
    </div>
  );
};

export default Overview;
