import { Users, Search, TrendingUp, ShoppingCart } from 'lucide-react';

export default function CustomersHeader({
  customers,
  onAdd,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus
}: any) {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-sm text-gray-600">Manage your customer database</p>
        </div>
        <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2">
          <Users size={18} /> Add New Customer
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} />
          <input
            className="pl-10 w-full border rounded-lg py-2"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border rounded-lg px-4"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </>
  );
}
