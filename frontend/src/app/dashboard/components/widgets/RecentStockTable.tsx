import { Package, MoreHorizontal, AlertCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { InventoryItem } from '@/src/api/api';

interface RecentStockTableProps {
  inventory: InventoryItem[];
}

export default function RecentStockTable({ inventory }: RecentStockTableProps) {
  // Enhanced dummy data for demo if empty
  const dummyInventory = [
    { id: 101, name: "Premium Basmati Rice", category: "Grains", price: 12.50, quantity: 450, status: "In Stock" },
    { id: 102, name: "Organic Olive Oil", category: "Oils", price: 24.99, quantity: 12, status: "Low Stock" },
    { id: 103, name: "Whole Wheat Flour", category: "Grains", price: 8.75, quantity: 0, status: "Out of Stock" },
    { id: 104, name: "Arabica Coffee Beans", category: "Beverages", price: 18.20, quantity: 85, status: "In Stock" },
    { id: 105, name: "Himalayan Pink Salt", category: "Spices", price: 5.40, quantity: 210, status: "In Stock" }
  ];

  const displayItems = inventory.length > 0 ? inventory.slice(0, 8) : dummyInventory;

  const getStatusConfig = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('out') || s === 'inactive') return {
      color: 'text-red-600 bg-red-50 border-red-100',
      icon: XCircle,
      label: 'Out of Stock'
    };
    if (s.includes('low')) return {
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      icon: AlertCircle,
      label: 'Low Stock'
    };
    return {
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      icon: CheckCircle2,
      label: 'In Stock'
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">Stock Movement</h3>
            <p className="text-xs text-gray-500 font-medium">Real-time inventory overview</p>
          </div>
        </div>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:gap-2 transition-all">
          View All <ArrowRight size={14} />
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="text-left py-3 px-6 text-[11px] uppercase tracking-wider font-bold text-gray-400">Product</th>
              <th className="text-left py-3 px-6 text-[11px] uppercase tracking-wider font-bold text-gray-400">Category</th>
              <th className="text-left py-3 px-6 text-[11px] uppercase tracking-wider font-bold text-gray-400">Price</th>
              <th className="text-center py-3 px-6 text-[11px] uppercase tracking-wider font-bold text-gray-400">Stock Level</th>
              <th className="text-right py-3 px-6 text-[11px] uppercase tracking-wider font-bold text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {displayItems.map((item) => {
              const statusConfig = getStatusConfig(item.status);
              const StatusIcon = statusConfig.icon;

              return (
                <tr key={item.id} className="group hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                        <Package size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">ID: #{item.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                    Rs. {Number(item.price).toLocaleString()}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-bold text-gray-700">{item.quantity}</span>
                      <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.quantity < 20 ? 'bg-red-500' : item.quantity < 100 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(item.quantity, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                      <StatusIcon size={12} strokeWidth={2.5} />
                      {statusConfig.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {displayItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Package size={48} strokeWidth={1} className="mb-3 text-gray-300" />
            <p className="text-sm font-medium">No inventory items found</p>
          </div>
        )}
      </div>
    </div>
  );
}
