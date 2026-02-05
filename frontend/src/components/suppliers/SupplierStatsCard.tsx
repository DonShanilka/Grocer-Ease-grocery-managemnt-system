import { Truck, TrendingUp, Package, DollarSign } from "lucide-react";

export default function SupplierStatsCard({ suppliers }: any) {
    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter((s: any) => s.status === "Active").length;
    const totalItems = suppliers.reduce((sum: number, s: any) => sum + (parseInt(s.qty) || 0), 0);
    const totalValue = suppliers.reduce((sum: number, s: any) => {
        const price = parseFloat(s.price_per_unit) || 0;
        const qty = parseInt(s.qty) || 0;
        return sum + (price * qty);
    }, 0);

    const stats = [
        {
            label: "Total Suppliers",
            value: totalSuppliers,
            icon: Truck,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            label: "Active",
            value: activeSuppliers,
            icon: TrendingUp,
            bgColor: "bg-green-100",
            textColor: "text-green-600"
        },
        {
            label: "Total Items",
            value: totalItems.toLocaleString(),
            icon: Package,
            bgColor: "bg-purple-100",
            textColor: "text-purple-600"
        },
        {
            label: "Total Value",
            value: `Rs. ${totalValue.toLocaleString()}`,
            icon: DollarSign,
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-600"
        }
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-50 p-3">
            <h3 className="text-xs font-bold text-gray-800 mb-3">Supplier Statistics</h3>
            <div className="space-y-2">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                    <Icon size={16} className={stat.textColor} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-600">{stat.label}</p>
                                    <p className="text-sm font-bold text-gray-800">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
