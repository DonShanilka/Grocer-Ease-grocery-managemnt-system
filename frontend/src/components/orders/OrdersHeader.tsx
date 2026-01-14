'use client';
import { Search } from 'lucide-react';

interface Props {
  search: string;
  setSearch: (v: string) => void;
  onAddNew: () => void;
}

export const OrdersHeader = ({ search, setSearch, onAddNew }: Props) => (
  <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search orders..."
        className="pl-10 pr-4 py-2 w-full border rounded-lg text-sm"
      />
    </div>
  </div>
);
