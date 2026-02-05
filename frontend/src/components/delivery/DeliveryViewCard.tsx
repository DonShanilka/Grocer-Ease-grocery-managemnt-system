"use client";

import React from "react";
import { X, Truck, MapPin, Phone, User, Package, Calendar, DollarSign, Info, CheckCircle } from "lucide-react";
import { Delivery } from "../../types/Delivery";

interface Props {
  delivery: Delivery;
  onClose: () => void;
}

export const DeliveryViewCard = ({ delivery, onClose }: Props) => {
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

  const getInitials = (driverName: string) => {
    return driverName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "D";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header with Background Gradient */}
        <div className="relative h-24 bg-gradient-to-r from-blue-700 to-blue-900 px-6 flex items-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-red-500 rounded-full transition-all text-white hover:scale-110"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="absolute -bottom-10 left-6 flex items-end gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-blue-800 font-bold text-2xl">
              <Truck size={36} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Delivery #{delivery.order_id}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(delivery.delivery_status)}`}>
                  {delivery.delivery_status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Delivery Details Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info size={14} /> Delivery Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {/* Address */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Delivery Address</p>
                    <p className="text-sm font-medium text-gray-800">{delivery.delivery_address}</p>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Contact Phone</p>
                    <p className="text-sm font-medium text-gray-800">{delivery.contact_phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver & Status Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Package size={14} /> Driver Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Assigned Driver</p>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <User size={14} className="text-blue-600" />
                    {delivery.assigned_driver || "Not Assigned"}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Delivery Status</p>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <CheckCircle size={14} className="text-green-600" />
                    {delivery.delivery_status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-bold shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


