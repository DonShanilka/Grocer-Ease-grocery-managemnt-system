'use client';
import { X, Package } from 'lucide-react';
import { InventoryItem } from '../../types/item';

interface Props {
  item: InventoryItem;
  onClose: () => void;
}

export const ViewCard = ({ item, onClose }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in stock': return 'bg-green-100 text-green-700';
      case 'low stock': return 'bg-yellow-100 text-yellow-700';
      case 'out of stock': return 'bg-red-100 text-red-700';
      case 'reorder needed': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Item Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Package size={40} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['Category', 'Price', 'Quantity', 'Unit', 'Supplier', 'Description', 'Added Date'].map((field, idx) => (
              <div key={idx}>
                <p className="text-xs text-gray-600 mb-1">{field}</p>
                <p className="text-sm font-medium text-gray-800">
                  {field === 'Price' ? `$${item.price.toFixed(2)}` :
                   field === 'Quantity' ? `${item.quantity} ${item.unit}` :
                   field === 'Description' ? item.description || 'No description' :
                   (item as any)[field.replace(' ', '_').toLowerCase()]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
