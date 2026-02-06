import { ShoppingBag, Search, TrendingUp, Package, Clock, CheckCircle2, Plus } from "lucide-react";
import { Order } from "../../types/Order";

interface OrdersHeaderProps {
  orders: Order[];
  onAdd: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
}

export default function OrdersHeader({
  orders,
  onAdd,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
}: OrdersHeaderProps) {
  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_amount?.toString() || "0"),
    0
  );

  const pendingCount = orders.filter((o) => o.status?.toLocaleLowerCase() === "pending").length;
  const completedCount = orders.filter((o) => o.status?.toLocaleLowerCase() === "completed").length;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Console</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage transactions and order fulfillment
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-md shadow-blue-600/20 transition-all hover:translate-y-[1px]"
        >
          <Plus size={18} />
          <span>New Transaction</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Orders</p>
              <h3 className="text-2xl font-black text-gray-800">
                {orders.length}
              </h3>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Package size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Pending</p>
              <h3 className="text-2xl font-black text-gray-800">
                {pendingCount}
              </h3>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Completed</p>
              <h3 className="text-2xl font-black text-gray-800">
                {completedCount}
              </h3>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Revenue</p>
              <h3 className="text-2xl font-black text-gray-800">
                Rs. {totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="DELIVERY">Delivery</option>
              <option value="TAKEAWAY">Takeaway</option>
              <option value="DINE_IN">Dine In</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
