import { InventoryItem } from '@/src/api/api';

interface StockLevelChartProps {
    inventory: InventoryItem[];
}

export default function StockLevelChart({ inventory }: StockLevelChartProps) {
    const dummyData = [
        { id: 1, name: "Rice", quantity: 450 },
        { id: 2, name: "Oil", quantity: 12 },
        { id: 3, name: "Flour", quantity: 0 },
        { id: 4, name: "Coffee", quantity: 85 },
        { id: 5, name: "Salt", quantity: 210 },
        { id: 6, name: "Sugar", quantity: 320 },
        { id: 7, name: "Milk", quantity: 15 },
        { id: 8, name: "Tea", quantity: 120 },
        { id: 9, name: "Pasta", quantity: 180 },
        { id: 10, name: "Butter", quantity: 5 }
    ];

    const chartItems = inventory.length > 0 ? inventory.slice(0, 10) : dummyData;
    const maxQty = Math.max(...chartItems.map(i => i.quantity || 0), 100);

    return (
        <div className="bg-white w-full lg:w-7/12 rounded-lg border border-gray-50 p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <h2 className="text-sm font-bold text-gray-800">Stock Level Status</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Threshold</span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                        <span className="text-gray-600">Current Stock</span>
                    </div>
                </div>
            </div>

            <div className="h-40 flex items-end justify-between gap-1 mb-4">
                {chartItems.map((item) => {
                    const heightPct = Math.min(100, Math.max(10, ((item.quantity || 0) / maxQty) * 100));

                    return (
                        <div
                            key={item.id}
                            className="flex-1 flex flex-col items-center gap-1 group relative"
                        >
                            <div
                                className="w-full bg-blue-500 rounded-t transition-all duration-500"
                                style={{ height: `${heightPct}%` }}
                                title={`${item.name}: ${item.quantity}`}
                            ></div>
                            <span
                                className="text-xs text-gray-600 hidden sm:block truncate w-full text-center"
                                style={{ maxWidth: '3rem' }}
                            >
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
