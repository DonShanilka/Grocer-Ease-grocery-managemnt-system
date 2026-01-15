"use client";

import React from "react";
import { X } from "lucide-react";
import { Delivery } from "../../types/Delivery";

interface Props {
  delivery: Delivery;
  onClose: () => void;
}

export const DeliveryViewCard = ({ delivery, onClose } : Props) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "RETURNED":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Delivery Details
        </h2>

        {/* CONTENT */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Order ID</span>
            <span>#{delivery.order_id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Address</span>
            <span className="text-right max-w-[60%]">
              {delivery.delivery_address}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Phone</span>
            <span>{delivery.contact_phone}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                delivery.delivery_status
              )}`}
            >
              {delivery.delivery_status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Assigned Driver</span>
            <span>{delivery.assigned_driver || "Not Assigned"}</span>
          </div>
        </div>

        {/* ACTION */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};


