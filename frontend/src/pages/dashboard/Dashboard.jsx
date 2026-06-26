import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

import Overview from './Overview';
import MyFarms from './MyFarms';
import Activities from './Activities';
import Expenses from './Expenses';
// Note: We will build AiAdvisor and NaturoAssistant in the next step
const Placeholder = ({ title }) => <div className="p-6">{title} Content Coming Soon...</div>;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/farms" element={<MyFarms />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/ai-advisor" element={<Placeholder title="AI Crop Advisor" />} />
            <Route path="/naturo-assistant" element={<Placeholder title="Naturo Assistant" />} />
            <Route path="/weather" element={<Placeholder title="Weather" />} />
            <Route path="/govt-schemes" element={<Placeholder title="Govt Schemes" />} />
            <Route path="/settings" element={<Placeholder title="Settings" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
