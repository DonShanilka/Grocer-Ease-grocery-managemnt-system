'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  UserCircle, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export default function GrocerySidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} />, href: '/orders' },
    { id: 'inventory', label: 'Inventory Management', icon: <Package size={20} />, href: '/inventory' },
    { id: 'deliveries', label: 'Deliveries', icon: <Truck size={20} />, href: '/deliveries' },
    { id: 'customers', label: 'Customers', icon: <Users size={20} />, href: '/customers' },
    { id: 'reports', label: 'Reports & Analytics', icon: <BarChart3 size={20} />, href: '/reports' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
    { id: 'account', label: 'My Account', icon: <UserCircle size={20} />, href: '/account' },
  ];

  const handleNavigation = (id: string) => {
    setActiveItem(id);
    // In a real Next.js app, you would use: router.push(href)
    console.log(`Navigating to: ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">GrocerEase</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={activeItem === item.id ? 'text-blue-600' : 'text-gray-500'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <LogOut size={20} className="text-red-500" />
            <span className='text-red-500'>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {navItems.find(item => item.id === activeItem)?.label}
          </h1>
          <p className="text-gray-600 mb-8">
            You're currently viewing the {navItems.find(item => item.id === activeItem)?.label.toLowerCase()} section
          </p>
          
          <div className="bg-white rounded-xl p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">
                  {navItems.find(item => item.id === activeItem)?.icon}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {navItems.find(item => item.id === activeItem)?.label}
              </h2>
              <p className="text-gray-600">
                Click on different sidebar items to navigate between sections
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}