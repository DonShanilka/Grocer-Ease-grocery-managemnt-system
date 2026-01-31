"use client";

import React, { useEffect, useState } from "react";
import { Package, Calendar, MoreVertical, ChevronDown } from "lucide-react";

const apiUrl = "http://127.0.0.1:5000";

type Delivery = {
  id: string;
  created_at: string;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DeliveryShipmentChart: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/deliveries`);
      const data = await res.json();
      setDeliveries(data);
    } catch (error) {
      console.error("Error fetching delivery status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const monthlyData = months.map((month, index) => {
    const count = deliveries.filter((delivery) => {
      const date = new Date(delivery.created_at);
      return date.getMonth() === index;
    }).length;

    return { month, count };
  });

  const maxCount = Math.max(...monthlyData.map((m) => m.count), 5);

  const yAxisSteps = 5;
  const yAxisValues = Array.from({ length: yAxisSteps + 1 }, (_, i) =>
    Math.round((maxCount / yAxisSteps) * i)
  ).reverse();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Shipment Analytics</h3>
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
      <div className="relative h-72 flex">
        {loading ? (
          <div className="flex items-center justify-center w-full text-gray-500">
            Loading analytics...
          </div>
        ) : (
          <>
            {/* Y Axis */}
            <div className="flex flex-col justify-between pr-4 text-xs text-gray-400">
              {yAxisValues.map((value, idx) => (
                <span key={idx}>{value}</span>
              ))}
            </div>

            {/* Bars */}
            <div className="flex-1 flex items-end gap-3 border-l border-b border-gray-200 pl-4 pb-4">
              {monthlyData.map((item) => {
                const height = (item.count / maxCount) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center"
                  >
                    {/* Bar */}
                    <div className="relative w-full h-56 flex items-end">
                      <div
                        className="
  w-full
  rounded-t-md
  transition-all
  bg-gradient-to-t
  from-blue-700
  via-blue-600
  to-blue-500
  hover:from-blue-900
  hover:via-blue-700
  hover:to-blue-600
  shadow-md
"
                        style={{ height: `${height}%` }}
                      >
                      </div>
                    </div>

                    {/* X Axis Label */}
                    <span className="mt-2 text-xs text-gray-500">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryShipmentChart;
