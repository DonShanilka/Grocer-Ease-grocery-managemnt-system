'use client';
import React, { useState } from 'react';
import Header from './DeliveryHeader';
import StatsCard, { DeliveryStats } from './DeliveryStatsCard';
import ShipmentChart from './DeliveryShipmentChart';
import LiveTracking from './LiveTracking';
import RevenueCard from './RevenueCard';
import { Calendar, Download, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ShipmentsTable } from './ShipmentsTable';

const DeliveryDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('This Month');

  const stats: DeliveryStats[] = [
    { label: 'Total Delivered', value: '200,913', change: '+2.00%', isPositive: true, icon: <Package className="w-6 h-6 text-white" />, color: 'bg-blue-500' },
    { label: 'On Delivery', value: '5,290', change: '-11.08%', isPositive: false, icon: <Truck className="w-6 h-6 text-white" />, color: 'bg-green-500' },
    { label: 'Cancel Delivery', value: '2,220', change: '+10.05%', isPositive: true, icon: <XCircle className="w-6 h-6 text-white" />, color: 'bg-pink-500' },
    { label: 'Return Delivery', value: '4,495', change: '-0.03%', isPositive: false, icon: <RotateCcw className="w-6 h-6 text-white" />, color: 'bg-yellow-400' }
  ];

//   const shipments: Shipment[] = [
//     { orderId: '#JT-938-424', category: 'Electronics', shipperDate: '08/07/2024', departure: 'California', destination: 'New York', weight: '12.3 Kg', status: 'Delivered' },
//     { orderId: '#JT-234-653', category: 'Toys & Game', shipperDate: '10/07/2024', departure: 'San Francisco', destination: 'California', weight: '24.5 Kg', status: 'Pending' }
//   ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Deliveries</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Calendar className="w-4 h-4" />
                {timeFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* {stats.map((stat) => <StatsCard key={stat.label} {...stat} />)} */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ShipmentChart />
            <LiveTracking />
          </div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2"><ShipmentsTable shipments={shipments} /></div>
            <RevenueCard />
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default DeliveryDashboard;
