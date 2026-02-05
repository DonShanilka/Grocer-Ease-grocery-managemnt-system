'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { Order } from '@/src/types/Order';

interface UpdateStatusModalProps {
  order: Order;
  onSave: (status: string) => void;
  onClose: () => void;
}

export const UpdateStatusModal = ({ order, onSave, onClose }: UpdateStatusModalProps) => {
  const [status, setStatus] = useState(order.status);

  const handleSave = () => {
    onSave(status);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Update Order Status</h3>
              <p className="text-sm text-blue-50 mt-1">
                Order #{order.id?.toString().padStart(4, '0')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Order Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none font-medium text-gray-800"
            >
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed (Done)</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Select the new status for this order
            </p>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Customer</p>
                <p className="font-semibold text-gray-900">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Amount</p>
                <p className="font-semibold text-gray-900">
                  Rs. {parseFloat(order.total_amount?.toString() || '0').toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-semibold shadow-sm"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};
