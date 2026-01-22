'use client';

import React, { useEffect, useState } from 'react';
import { Package, Calendar, MoreVertical, ChevronDown } from 'lucide-react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Delivery = {
  id: string;
  created_at: string;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DeliveryShipmentChart: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch deliveries
  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/deliveries`);
      const data = await res.json();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching delivery status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  // 🔹 Analyze deliveries by month using created_at
  const monthlyData = months.map((month, index) => {
    const count = deliveries.filter((delivery) => {
      const date = new Date(delivery.created_at);
      return date.getMonth() === index;
    }).length;

    return {
      month,
      count,
    };
  });

  // 🔹 Find max value for height calculation
  const maxCount = Math.max(...monthlyData.map((m) => m.count), 1);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Shipment analytics</h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Monthly
            <ChevronDown className="w-4 h-4" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading analytics...
          </div>
        ) : (
          <div className="absolute inset-0 flex items-end justify-around gap-3 pb-8">
            {monthlyData.map((item) => {
              const height = (item.count / maxCount) * 100;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-blue-600 rounded-t-lg relative transition-all"
                    style={{ height: `${height}%` }}
                  >
                    {item.count > 0 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                        {item.count}
                      </div>
                    )}
                  </div>

                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryShipmentChart;
