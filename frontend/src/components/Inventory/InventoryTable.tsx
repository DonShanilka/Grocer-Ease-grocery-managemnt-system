'use client';
import { Package } from 'lucide-react';
import { InventoryItem } from '../../types/item';

interface Props {
  items: InventoryItem[];
  onView: (item: InventoryItem) => void;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: number) => void;
}

export const InventoryTable = ({ items, onView, onEdit, onDelete }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'low stock': return 'bg-yellow-100 text-yellow-700';
      case 'out of stock': return 'bg-red-100 text-red-700';
      case 'reorder needed': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white w-7/12 rounded-lg border border-gray-200 overflow-hidden px-6 mb-6">
      <div className="overflow-x-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              {['Name', 'Stock', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-xs font-medium text-gray-800">{item.name}</td>
                <td className="py-3 px-4 text-xs text-gray-800">{item.quantity} {item.unit}</td>
                <td className="py-3 px-4 text-xs text-gray-800">{item.category}</td>
                <td className="py-3 px-4 text-xs font-medium text-gray-800">${item.price}</td>
                {/* <td className="py-3 px-4 text-xs text-gray-800">{item.supplier}</td> */}
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                {/* <td className="py-3 px-4 text-sm text-gray-800">{item.added_date}</td> */}
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => onView(item)} className="text-blue-600 hover:underline text-sm">View</button>
                  <button onClick={() => onEdit(item)} className="text-green-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => onDelete(item.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
};
