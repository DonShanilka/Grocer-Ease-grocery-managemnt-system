'use client';

import { Order } from "@/src/types/Order";

interface Props {
  orders: Order[];
  onView: (order: Order) => void;
  onUpdateStatus: (order: Order) => void;
}

export const OrderTable = ({ orders, onView, onUpdateStatus }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 px-6 mb-6">
      <div className="overflow-y-auto max-h-[320px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-xs font-semibold">
              <th className="py-3 text-left">Customer</th>
              <th>Order Type</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b text-xs hover:bg-gray-50">
                <td className="py-3">{order.customer_name}</td>
                <td>{order.order_type}</td>
                <td>{order.payment_type}</td>
                <td>
                  <span className="px-2 py-1 rounded bg-gray-100">
                    {order.status}
                  </span>
                </td>
                <td>${order.total_amount}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView(order)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onUpdateStatus(order)}
                      className="text-green-600 hover:underline"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};
