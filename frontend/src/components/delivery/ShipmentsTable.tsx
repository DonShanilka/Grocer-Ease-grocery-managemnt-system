'use client';
import React from 'react';
import { Delivery } from '../../types/Delivery';
import { Package } from 'lucide-react';

interface Props {
    shipments: Delivery[];
    onView: (shipment: Delivery) => void;
    onEdit: (shipment: Delivery) => void;
}

export const ShipmentsTable = ({ shipments, onView, onEdit }: Props) => {
  return (
    <div className="bg-white w-full rounded-lg border border-gray-50 overflow-hidden px-6 mb-6">
  <div className="overflow-x-scroll">

    {/* TABLE HEADER */}
    <table className="w-full border-collapse">
      <thead className="bg-white sticky top-0 z-10">
        <tr className="border-b border-gray-200">
          {[
            'ID',
            'Address',
            'Phone ',
            'Status',
            'Assigned Driver',
          ].map((h) => (
            <th
              key={h}
              className="text-left py-3 px-4 text-xs font-semibold text-black"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
    </table>

    {/* SCROLL BODY */}
    <div className="max-h-[280px] overflow-y-auto">
      <table className="w-full border-collapse">
        <tbody>
          {shipments.map((shipment) => (
            <tr
              key={shipment.order_id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
                <td className="py-3 px-4 text-xs font-medium text-gray-800">
                {shipment.id}
              </td>
              <td className="py-3 px-4 text-xs font-medium text-gray-800">
                {shipment.delivery_address}
              </td>

              <td className="py-3 px-4 text-xs text-gray-800">
                {shipment.contact_phone}
              </td>

              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    shipment.delivery_status as any === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {shipment.delivery_status}
                </span>
              </td>

              <td className="py-3 px-4 text-xs text-gray-800">
                {shipment.assigned_driver ?? 'Unassigned'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {shipments.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No deliveries found</p>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

