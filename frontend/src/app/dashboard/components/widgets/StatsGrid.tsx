
import { 
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Order } from '@/src/api/api';

interface StatsGridProps {
  orders: Order[];
}

export default function StatsGrid({ orders }: StatsGridProps) {
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'COMPLETED').length;
  const cancelledOrders = orders.filter(o => o.status === 'CANCELLED').length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;

  // Helper to calculate dummy percentage change (mock logic since we don't have historical data yet)
  // In a real app, we'd compare with previous month's data.
  const getTrend = (count: number) => {
     // utilizing a deterministic mock trend based on count parity for visual variety
     return count % 2 === 0 ? { val: '+2.00%', up: true } : { val: '-1.50%', up: false };
  };

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Total Orders */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalOrders}</h3>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                📦
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {getTrend(totalOrders).up ? (
                 <TrendingUp size={14} className="text-green-500" />
            ) : (
                <TrendingDown size={14} className="text-red-500" />
            )}
            <span className={getTrend(totalOrders).up ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {getTrend(totalOrders).val}
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Orders Completed */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Orders Completed</p>
              <h3 className="text-2xl font-bold text-gray-800">{completedOrders}</h3>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
             {getTrend(completedOrders).up ? (
                 <TrendingUp size={14} className="text-green-500" />
            ) : (
                <TrendingDown size={14} className="text-red-500" />
            )}
            <span className={getTrend(completedOrders).up ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {getTrend(completedOrders).val}
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Orders Cancelled */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Orders Cancelled</p>
              <h3 className="text-2xl font-bold text-gray-800">{cancelledOrders}</h3>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                ✕
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {getTrend(cancelledOrders).up ? (
                 <TrendingUp size={14} className="text-green-500" />
            ) : (
                <TrendingDown size={14} className="text-red-500" />
            )}
           <span className={getTrend(cancelledOrders).up ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {getTrend(cancelledOrders).val}
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Orders Pending */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-4 rounded-lg text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-blue-100 mb-1">Orders Pending</p>
              <h3 className="text-2xl font-bold">{pendingOrders}</h3>
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
  );
}
