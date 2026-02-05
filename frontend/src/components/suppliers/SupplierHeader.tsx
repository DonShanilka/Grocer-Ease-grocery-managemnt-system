import { Truck, Search, TrendingUp, Package, DollarSign } from "lucide-react";

export default function SupplierHeader({
    suppliers,
    onAdd,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
}: any) {
    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter((s: any) => s.status === "Active").length;
    const totalItems = suppliers.reduce((sum: number, s: any) => sum + (parseInt(s.qty) || 0), 0);
    const totalValue = suppliers.reduce((sum: number, s: any) => {
        const price = parseFloat(s.price_per_unit) || 0;
        const qty = parseInt(s.qty) || 0;
        return sum + (price * qty);
    }, 0);

    return (
        <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage your supplier network
                    </p>
                </div>

                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                    <Truck size={18} />
                    <span>Add New Supplier</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Total Suppliers</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {totalSuppliers}
                            </h3>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Truck size={20} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Active Suppliers</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {activeSuppliers}
                            </h3>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <TrendingUp size={20} className="text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Total Items</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {totalItems.toLocaleString()}
                            </h3>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Package size={20} className="text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Total Value</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Rs. {totalValue.toLocaleString()}
                            </h3>
                        </div>
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <DollarSign size={20} className="text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white p-4 rounded-lg mb-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Search suppliers by name, email, or items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-100"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>
        </>
    );
}
