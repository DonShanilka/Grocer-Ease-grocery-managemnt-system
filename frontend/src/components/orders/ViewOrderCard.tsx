"use client";

import { X, Calendar, User, CreditCard, Activity, PackageCheck, Info, MapPin, Hash, ShoppingBag, Clock } from "lucide-react";
import { Order } from "../../types/Order";

interface Props {
  order: Order;
  onClose: () => void;
}

export const ViewOrderCard = ({ order, onClose }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "O";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 text-gray-800">
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
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-blue-800">
              <PackageCheck size={40} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Order #{order.id.toString().padStart(4, '0')}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-gray-400 text-xs">• Type: {order.order_type}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Customer Information Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <User size={14} /> Customer Information
              </h3>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                  {getInitials(order.customer_name)}
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Ordered By</p>
                  <p className="text-sm font-medium">{order.customer_name}</p>
                </div>
              </div>
            </div>

            {/* Financials & Logistics Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info size={14} /> Order Financials
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Amount</p>
                  <div className="flex items-center gap-2 text-lg font-bold text-blue-800">
                    <CreditCard size={18} />
                    Rs. {parseFloat(order.total_amount.toString()).toLocaleString()}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Payment Type</p>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <ShoppingBag size={14} className="text-purple-600" />
                    {order.payment_type}
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-gray-500 uppercase font-bold">Placement Date:</span>
                    </div>
                    <span className="font-bold text-gray-800">
                      {new Date(order.created_at || "").toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
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
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
