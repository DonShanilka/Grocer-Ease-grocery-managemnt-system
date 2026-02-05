
import { 
    Search, 
    Filter, 
    ChevronLeft, 
    ChevronRight 
} from 'lucide-react';
import { InventoryItem } from '@/src/api/api';

interface RecentStockTableProps {
    inventory: InventoryItem[];
}

export default function RecentStockTable({ inventory }: RecentStockTableProps) {
  // Simple pagination logic could go here, but for now just show all or top 10
  const displayItems = inventory.slice(0, 10);

  return (
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-sm font-bold text-gray-800">Current Stock Overview</h2>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-7 pr-3 py-1.5 w-full border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs">
              <Filter size={14} />
              <span>Filters</span>
            </button>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-gray-50 rounded-lg">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-50 rounded-lg">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">#</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Product</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Category</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Price</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Stock</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {displayItems.length > 0 ? displayItems.map((item, index) => (
                   <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 text-xs text-gray-800">{index + 1}</td>
                    <td className="py-3 px-3 text-xs text-gray-800 font-medium">{item.name}</td>
                    <td className="py-3 px-3 text-xs text-gray-800">{item.category}</td>
                    <td className="py-3 px-3 text-xs text-gray-800">${item.price}</td>
                    <td className="py-3 px-3 text-xs text-gray-800">
                        {/* Assuming Item model has quantity, if not defined in API interface previously we might default to 0 */}
                        {(item as any).quantity || 0}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap 
                        ${item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-gray-800">
                        {/* Provide safe access if supplier is an object or string */}
                        {typeof item.supplier === 'object' ? (item.supplier as any)?.name : item.supplier}
                    </td>
                  </tr>
              )) : (
                  <tr>
                      <td colSpan={7} className="text-center py-4 text-sm text-gray-500">No inventory items found</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
