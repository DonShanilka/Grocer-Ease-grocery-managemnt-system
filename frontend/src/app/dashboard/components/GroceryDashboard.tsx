'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchOrders, fetchItems, Order, InventoryItem } from '@/src/api/api';
import StatsGrid from './widgets/StatsGrid';
import OrderSourcesChart from './widgets/OrderSourcesChart';
import TotalRevenueChart from './widgets/TotalRevenueChart';
import RecentStockTable from './widgets/RecentStockTable';

export default function GroceryDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search something here..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid orders={orders} />

      {/* Charts Row */}
      <div className="flex flex-col lg:flex-row gap-6 px-6 mb-6">
        <OrderSourcesChart orders={orders} />
        <TotalRevenueChart orders={orders} />
      </div>

      {/* Table */}
      <div className='p-6'>
        <RecentStockTable inventory={inventory} />
      </div>
    </div>
  );
}
