'use client';

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Download,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function GroceryDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('This Month');

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div className="w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search something here..."
              className="pl-8 pr-3 py-2 w-full sm:w-64 lg:w-80 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor"
              alt="Eleanor Pena"
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-gray-800">Eleanor Pena</p>
              <p className="text-xs text-gray-500">eleanor@email.com</p>
            </div>
            <ChevronDown size={14} className="text-gray-600 hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div>
          <p className="text-gray-600 text-xs mb-1">Hello Eleanor Pena</p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Good Morning!</h1>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex-1 sm:flex-initial">
            <Calendar size={14} />
            <span className="text-xs font-medium">{selectedMonth}</span>
            <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex-1 sm:flex-initial justify-center">
            <Download size={14} />
            <span className="text-xs font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Total Orders */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">35,500</h3>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                📦
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-green-500 font-medium">+2.00%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Orders Completed */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Orders Completed</p>
              <h3 className="text-2xl font-bold text-gray-800">20,000</h3>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown size={14} className="text-red-500" />
            <span className="text-red-500 font-medium">-11.00%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Orders Cancelled */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Orders Cancelled</p>
              <h3 className="text-2xl font-bold text-gray-800">5,000</h3>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                ✕
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp size={14} className="text-red-500" />
            <span className="text-red-500 font-medium">-8.00%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Orders Pending */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-4 rounded-lg text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-blue-100 mb-1">Orders Pending</p>
              <h3 className="text-2xl font-bold">10,500</h3>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs">
                ⏱
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp size={14} />
            <span className="font-medium">+6.08%</span>
            <span className="text-blue-100">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Order Sources Overview */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">Order Sources Overview</h2>
            <select className="px-2 py-1 border border-gray-200 rounded-lg text-xs">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="100 251" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="80 251" strokeDashoffset="-100" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="71 251" strokeDashoffset="-180" transform="rotate(-90 50 50)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-gray-800">2,350</p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Website Orders (40%)</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">500,000</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Mobile App Orders (35%)</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">1000,000</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">In-Store Orders (25%)</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">345,000</span>
            </div>
          </div>
        </div>

        {/* Live Tracking Delivery */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-800">Live Tracking Delivery</h2>
            <button className="p-1">
              <span className="text-gray-400 text-sm">•••</span>
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-lg h-40 mb-3 relative overflow-hidden">
            <img src="https://api.placeholder.com/600x400?text=Map+View" alt="Map" className="w-full h-full object-cover opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 bg-red-500 rounded-full shadow-lg flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
              On the way
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Tracking ID</span>
              <span className="font-semibold text-gray-800">#1712-72-7838</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Departure</span>
              <span className="font-semibold text-gray-800">California</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Departure Date</span>
              <span className="font-semibold text-gray-800">05/17/2024 - 10:30AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Destination</span>
              <span className="font-semibold text-gray-800">New York</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Time Arrival</span>
              <span className="font-semibold text-gray-800">12/07/2024 - 08:30AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Level Status */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-sm font-bold text-gray-800">Stock Level Status</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Threshold</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
              <span className="text-gray-600">Current Stock</span>
            </div>
            <select className="px-2 py-1 border border-gray-200 rounded-lg text-xs w-full sm:w-auto">
              <option>01 July - 31 July, 2024</option>
            </select>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-40 flex items-end justify-between gap-1 mb-4">
          {['Milk', 'Rice', 'Beef', 'Eggs', 'Tuna', 'Salt', 'Corn', 'Soup', 'Kale', 'Pork', 'Lamb', 'Beans'].map((item, index) => {
            const heights = [75, 65, 70, 45, 80, 85, 50, 75, 80, 60, 55, 40];
            return (
              <div key={item} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-500 rounded-t" style={{ height: `${heights[index]}%` }}></div>
                <span className="text-xs text-gray-600 hidden sm:block">{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stock Overview */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-sm font-bold text-gray-800">Current Stock Overview</h2>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-7 pr-3 py-1.5 w-full border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs">
              <Filter size={14} />
              <span>Filters</span>
            </button>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-gray-50 rounded-lg">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-50 rounded-lg">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">#</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Product</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Current Stock</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Threshold</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Reorder Qty</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Supplier</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Lead Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-3 text-xs text-gray-800">1</td>
                <td className="py-3 px-3 text-xs text-gray-800 font-medium">Apples</td>
                <td className="py-3 px-3 text-xs text-gray-800">50</td>
                <td className="py-3 px-3 text-xs text-gray-800">100</td>
                <td className="py-3 px-3 text-xs text-gray-800">50</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                    Needs Reordering
                  </span>
                </td>
                <td className="py-3 px-3 text-xs text-gray-800">ABC Fruit Suppliers</td>
                <td className="py-3 px-3 text-xs text-gray-800">2 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}