'use client';
import React from 'react';
import { MoreVertical, MapPin, ChevronDown } from 'lucide-react';

const LiveTracking: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Live Tracking Delivery</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="relative bg-gray-50 rounded-lg h-48 mb-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <path d="M 10 100 Q 60 50, 100 100 T 190 100" stroke="#94a3b8" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-red-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Rest of live tracking details remain unchanged */}
    </div>
  );
};

export default LiveTracking;
