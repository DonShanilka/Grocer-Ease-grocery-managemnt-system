'use client';
import { OrdersTable } from './OrdersTable';
import { Order } from '../../types/Order';

interface Props {
  orders: Order[];
  onClose: () => void;
  onView: (o: Order) => void;
  onDelete: (id: number) => void;
}

export const OrdersModal = ({ orders, onClose, onView, onDelete }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 md:w-4/5 lg:w-3/4 rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Orders</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="max-h-[70vh] overflow-y-auto">
          <OrdersTable
            orders={orders}
            onView={onView}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
};
