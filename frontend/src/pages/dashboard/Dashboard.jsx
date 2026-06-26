import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

// Dashboard Sub-pages (Placeholders for now)
const Overview = () => <div className="p-6">Dashboard Overview Content</div>;
const MyFarms = () => <div className="p-6">My Farms Content</div>;
const Activities = () => <div className="p-6">Activities Content</div>;

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
            {/* Add more routes here as we build them */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
