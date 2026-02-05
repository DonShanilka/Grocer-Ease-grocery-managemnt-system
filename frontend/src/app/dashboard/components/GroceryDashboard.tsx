'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Download,
  Calendar,
  MapPin
} from 'lucide-react';
import { fetchOrders, fetchItems, Order, InventoryItem } from '@/src/api/api';
import StatsGrid from './widgets/StatsGrid';
import OrderSourcesChart from './widgets/OrderSourcesChart';
import StockLevelChart from './widgets/StockLevelChart';
import RecentStockTable from './widgets/RecentStockTable';

export default function GroceryDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('This Month');
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersData, itemsData] = await Promise.all([
          fetchOrders(),
          fetchItems()
        ]);
        setOrders(ordersData);
        setInventory(itemsData);
      } catch (error) {
        console.error('Dashboard data load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
      <StatsGrid orders={orders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Order Sources Overview */}
        <OrderSourcesChart orders={orders} />

        {/* Live Tracking Delivery - Keep hardcoded for now or componentize later if specific API exists */}
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
      <StockLevelChart inventory={inventory} />

      {/* Current Stock Overview */}
      <RecentStockTable inventory={inventory} />
    </div>
  );
}
