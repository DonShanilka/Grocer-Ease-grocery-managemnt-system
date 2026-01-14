'use client';
import React from 'react';

export interface Shipment {
  orderId: string;
  category: string;
  shipperDate: string;
  departure: string;
  destination: string;
  weight: string;
  status: 'Delivered' | 'Pending';
}

const ShipmentsTable: React.FC<{ shipments: Shipment[] }> = ({ shipments }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-y border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipper Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shipments.map((shipment) => (
              <tr key={shipment.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{shipment.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{shipment.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{shipment.shipperDate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{shipment.departure}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{shipment.destination}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{shipment.weight}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    shipment.status === 'Delivered'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentsTable;
