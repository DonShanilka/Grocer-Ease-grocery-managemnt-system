import { InventoryItem } from '@/src/api/api';

interface StockLevelChartProps {
    inventory: InventoryItem[];
}

export default function StockLevelChart({ inventory }: StockLevelChartProps) {
    // Take top 12 items for the chart to fit UI
    const chartItems = inventory.slice(0, 12);
    const maxQty = Math.max(...chartItems.map(i => i.quantity || 0), 100);

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
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

            {/* Bar Chart */}
            <div className="h-40 flex items-end justify-between gap-1 mb-4">
                {chartItems.length > 0 ? (
                    chartItems.map((item) => {
                        const heightPct = Math.min(
                            100,
                            Math.max(10, ((item.quantity || 0) / maxQty) * 100)
                        );

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
                    })
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No stock data available
                    </div>
                )}
            </div>
        </div>
    );
}
