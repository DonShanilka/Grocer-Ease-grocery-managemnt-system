'use client';
import { Search } from 'lucide-react';

interface Props {
  onAddNew: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const InventoryHeader = ({ onAddNew, searchQuery, setSearchQuery }: Props) => (
  <div className="bg-white border-b  px-6 py-4">
    <div className="flex items-center justify-between mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search something here..."
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={onAddNew}
        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
      >
        Add Item
      </button>
    </div>
  </div>
);
