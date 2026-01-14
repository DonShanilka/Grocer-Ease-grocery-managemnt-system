'use client';
import React from 'react';
import { Package, Calendar, MoreVertical, ChevronDown } from 'lucide-react';

const DeliveryShipmentChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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
            01 May - 1 Oct
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-around gap-2 pb-8">
          {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, idx) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: `${20 + idx * 10}%` }}>
                {idx === 2 && (
                  <>
                    <div className="absolute inset-0 bg-blue-600 rounded-t-lg"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                      Avg 14k
                    </div>
                  </>
                )}
              </div>
              <span className="text-xs text-gray-500">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryShipmentChart;
