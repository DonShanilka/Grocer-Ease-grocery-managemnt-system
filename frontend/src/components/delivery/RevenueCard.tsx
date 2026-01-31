'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';

const RevenueCard: React.FC = () => {
  const revenueData = [
    { month: 'July', value: 488214, percentage: 63.60 },
    { month: 'Jun', value: 421186, percentage: 42.86 },
    { month: 'May', value: 392685, percentage: 52.65 },
    { month: 'Apr', value: 315284, percentage: 60.68 }
  ];

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
        <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-gray-900">$20,2854.38</p>
          <span className="text-sm font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded">+19%</span>
        </div>
      </div>
      <div className="space-y-2">
        {revenueData.map((item) => (
          <div key={item.month}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.month}</span>
              <span className="text-gray-900 font-medium">${item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueCard;
