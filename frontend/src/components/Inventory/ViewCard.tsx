'use client';
import { X, Package, Tag, DollarSign, Hash, Layers, FileText, User, CheckCircle, Info, Calendar } from 'lucide-react';
import { InventoryItem } from '../../types/Items';

interface Props {
  item: InventoryItem;
  onClose: () => void;
}

export const ViewCard = ({ item, onClose }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
      case 'in stock':
        return 'bg-green-100 text-green-700';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-700';
      case 'out of stock':
        return 'bg-red-100 text-red-700';
      case 'reorder needed':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "P";
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
              <Package size={40} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{item.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <span className="text-gray-400 text-xs">• ID: #{item.id}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* General Information Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info size={14} /> Product Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                    <Tag size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Category</p>
                    <p className="text-sm font-medium text-gray-800">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Supplier</p>
                    <p className="text-sm font-medium text-gray-800">{item.supplier}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Details Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers size={14} /> Inventory & Stock
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Stock Level</p>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <Hash size={14} className="text-blue-600" />
                    {item.quantity} {item.unit}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Unit Price</p>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <DollarSign size={14} className="text-green-600" />
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
                {item.description && (
                  <div className="col-span-2 pt-2 border-t border-gray-200">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Description</p>
                    <div className="flex items-start gap-2 text-sm text-gray-600 italic">
                      <FileText size={14} className="mt-1 flex-shrink-0" />
                      {item.description}
                    </div>
                  </div>
                )}
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
