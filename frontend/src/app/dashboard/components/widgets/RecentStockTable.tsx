import { Package } from 'lucide-react';
import { InventoryItem } from '@/src/api/api';

interface RecentStockTableProps {
  inventory: InventoryItem[];
}

export default function RecentStockTable({ inventory }: RecentStockTableProps) {
  const dummyInventory = [
    { id: 101, name: "Premium Basmati Rice", category: "Grains", price: 12.50, quantity: 450, status: "In Stock", supplier: "AgroCorp" },
    { id: 102, name: "Organic Olive Oil", category: "Oils", price: 24.99, quantity: 12, status: "Low Stock", supplier: "Mediterra" },
    { id: 103, name: "Whole Wheat Flour", category: "Grains", price: 8.75, quantity: 0, status: "Out of Stock", supplier: "Global Mills" },
    { id: 104, name: "Arabica Coffee Beans", category: "Beverages", price: 18.20, quantity: 85, status: "In Stock", supplier: "RoastMasters" },
    { id: 105, name: "Sea Salt Grinder", category: "Spices", price: 5.40, quantity: 210, status: "In Stock", supplier: "SaltWorks" }
  ];

  const displayItems = inventory.length > 0 ? inventory.slice(0, 10) : dummyInventory;

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('out')) return 'bg-red-100 text-red-700';
    if (s.includes('low')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-50 overflow-hidden px-6 mb-6">
      <div className="overflow-x-scroll">
        <table className="w-full border-collapse">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              {["Name", "Category", "Price", "Stock", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-4 text-xs font-semibold text-black"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <div className="max-h-[280px] overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {displayItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-xs font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-800">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 text-xs font-medium text-gray-800">
                    {item.price}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-800">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {displayItems.length === 0 && (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No items found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
