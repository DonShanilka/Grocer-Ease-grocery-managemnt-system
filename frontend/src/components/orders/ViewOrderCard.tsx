"use client";

import { X, Calendar, User, CreditCard, Activity, PackageCheck } from "lucide-react";
import { Order } from "../../types/Order";

interface Props {
  order: Order;
  onClose: () => void;
}

export const ViewOrderCard = ({ order, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
      <div
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-300"
      >
        {/* Header */}
        <div className="bg-blue-700 p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-white/10 rounded-2xl">
              <PackageCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-xs font-black uppercase tracking-widest">Order Receipt</p>
              <h2 className="text-3xl font-black tracking-tight mt-1">
                #{order.id.toString().padStart(4, '0')}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Customer</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{order.customer_name}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Status</span>
              </div>
              <div>
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase border ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    order.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-rose-50 text-rose-700 border-rose-100'
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Placement Date</span>
              </div>
              <p className="text-lg font-bold text-gray-800">
                {new Date(order.created_at || "").toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Total Amount</span>
              </div>
              <p className="text-2xl font-black text-blue-700">
                Rs. {parseFloat(order.total_amount.toString()).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 flex items-center justify-between text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            <span>Powered by GrocerEase Enterprise</span>
            <span>Digital Copy</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-5 bg-gray-900 hover:bg-black text-white font-black rounded-2xl transition-all transform hover:shadow-xl active:scale-[0.98] text-lg mt-4"
          >
            Close Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
