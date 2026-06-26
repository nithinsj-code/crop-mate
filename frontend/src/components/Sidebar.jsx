import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  ClipboardList, 
  CircleDollarSign, 
  Sprout, 
  MessageSquare, 
  CloudSun, 
  BookOpen, 
  Settings 
} from 'lucide-react';

const Sidebar = ({ isOpen, setOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'My Farms', path: '/dashboard/farms', icon: <Map size={20} /> },
    { name: 'Activities', path: '/dashboard/activities', icon: <ClipboardList size={20} /> },
    { name: 'Expenses', path: '/dashboard/expenses', icon: <CircleDollarSign size={20} /> },
    { name: 'AI Crop Advisor', path: '/dashboard/ai-advisor', icon: <Sprout size={20} /> },
    { name: 'Naturo Assistant', path: '/dashboard/naturo-assistant', icon: <MessageSquare size={20} /> },
    { name: 'Weather', path: '/dashboard/weather', icon: <CloudRain size={20} /> },
    { name: 'Govt Schemes', path: '/dashboard/govt-schemes', icon: <BookOpen size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-[#1B4332] text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-5">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold tracking-wider">NaturoCrop</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-[#4CAF50] text-white font-medium' 
                  : 'text-green-100 hover:bg-[#2D6A2D] hover:text-white'
                }
              `}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
