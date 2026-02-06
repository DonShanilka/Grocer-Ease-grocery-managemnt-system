'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';

const RevenueCard: React.FC = () => {
  const [revenueData, setRevenueData] = React.useState<{ month: string; value: number; percentage: number }[]>([]);
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [growth, setGrowth] = React.useState(0); 
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const { fetchOrders } = await import('@/src/api/api');
        const orders = await fetchOrders();

        const deliveryOrders = orders.filter(o => o.order_type === 'DELIVERY' && o.status !== 'CANCELLED');

        const total = deliveryOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
        setTotalRevenue(total);

        const currentYear = new Date().getFullYear();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const monthlyTotals = new Array(12).fill(0);

        deliveryOrders.forEach(o => {
          if (!o.created_at) return;
          const date = new Date(o.created_at);
          if (date.getFullYear() === currentYear) {
            monthlyTotals[date.getMonth()] += (Number(o.total_amount) || 0);
          }
        });

        const maxVal = Math.max(...monthlyTotals, 1); 

        const currentMonthIndex = new Date().getMonth();
        const chartItems = [];

        // Show last 4 months including current
        for (let i = 0; i < 4; i++) {
          let mIndex = currentMonthIndex - i;
          if (mIndex < 0) mIndex += 12; // Wrap around if needed (though usually we want current year, so maybe stop at 0)

          if (mIndex >= 0) { // Only show this year's months
            chartItems.push({
              month: months[mIndex],
              value: monthlyTotals[mIndex],
              percentage: (monthlyTotals[mIndex] / maxVal) * 100
            });
          }
        }

        setRevenueData(chartItems);

      } catch (err) {
        console.error("Failed to load revenue data", err);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Shipping Revenue</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
          This Year
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Total Delivery Revenue</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-gray-900">Rs. {totalRevenue.toLocaleString()}</p>
          {/* <span className="text-sm font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded">+19%</span> */}
        </div>
      </div>
      <div className="space-y-4">
        {revenueData.length > 0 ? revenueData.map((item) => (
          <div key={item.month}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.month}</span>
              <span className="text-gray-900 font-medium">Rs. {item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        )) : (
          <p className="text-sm text-gray-400 text-center py-4">No revenue data for recent months</p>
        )}
      </div>
    </div>
  );
};

export default RevenueCard;
