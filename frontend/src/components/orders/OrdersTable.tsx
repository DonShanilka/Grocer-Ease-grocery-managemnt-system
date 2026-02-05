"use client";

import { Eye, Trash2, MoreVertical, ShoppingBag } from "lucide-react";
import { Order } from "../../types/Order";

interface Props {
  orders: Order[];
  onView: (o: Order) => void;
  onDelete: (id: number) => void;
}

export const OrdersTable = ({ orders, onView, onDelete }: Props) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-rose-50 text-rose-700 border-rose-100";
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-50 bg-gray-50/50">
            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-3 h-3" />
                Order ID
              </div>
            </th>
            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">
              Amount
            </th>
            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((o) => (
            <tr
              key={o.id}
              className="group hover:bg-blue-50/30 transition-all duration-200"
            >
              <td className="px-6 py-5">
                <span className="font-bold text-gray-900 leading-none">
                  #{o.id.toString().padStart(4, '0')}
                </span>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">
                  {new Date(o.created_at || "").toLocaleDateString()}
                </p>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {o.customer_name[0]}
                  </div>
                  <span className="font-semibold text-gray-700">{o.customer_name}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <span className="font-black text-gray-900">
                  Rs. {parseFloat(o.total_amount.toString()).toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyles(o.status)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60"></span>
                  {o.status.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView(o)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors group-hover:shadow-sm"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(o.id)}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors group-hover:shadow-sm"
                    title="Delete Order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
