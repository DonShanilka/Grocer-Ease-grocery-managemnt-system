"use client";

import React, { useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";
import { Order } from "../../../../api/api"; // Assuming api.ts has Order type or use local type

interface TotalRevenueChartProps {
    orders: Order[];
}

const TotalRevenueChart: React.FC<TotalRevenueChartProps> = ({ orders }) => {
    const chartData = useMemo(() => {
        const revenueByDate: Record<string, number> = {};

        orders.forEach((order) => {
            if (!order.created_at || order.status.toLowerCase() === "cancelled") return;

            const date = new Date(order.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });

            const amount = typeof order.total_amount === "string"
                ? parseFloat(order.total_amount)
                : order.total_amount;

            revenueByDate[date] = (revenueByDate[date] || 0) + (amount || 0);
        });

        return Object.entries(revenueByDate).map(([date, total]) => ({
            date,
            total,
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Basic sort, might need better date parsing for sort if format is localized
        // Better sort approach: keep keys as ISO, sort, then format for display. 
        // For simplicity, let's rely on API sending chronological or just simple sort if dates are comparable.
        // If created_at is ISO, simple string sort works.
    }, [orders]);

    // Robust sort fix:
    const processedData = useMemo(() => {
        const map = new Map<string, number>();

        orders.forEach(o => {
            if (!o.created_at || o.status.toLowerCase() === "cancelled") return;
            // Use YYYY-MM-DD for sorting
            const isoDate = new Date(o.created_at).toISOString().split('T')[0];
            const amount = Number(o.total_amount) || 0;
            map.set(isoDate, (map.get(isoDate) || 0) + amount);
        });

        // Convert to array and sort
        const sorted = Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));

        // Format for display
        return sorted.map(([isoDate, total]) => ({
            date: new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            total
        }));
    }, [orders]);

    const totalRevenue = processedData.reduce((sum, item) => sum + item.total, 0);

    return (
        <div className="bg-white w-full lg:w-7/12 rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Revenue Analytics</h2>
                        <p className="text-xs text-gray-500 font-medium">Daily income overview</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Revenue</p>
                    <h3 className="text-2xl font-black text-gray-900">
                        Rs. {totalRevenue.toLocaleString()}
                    </h3>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            tickFormatter={(value) => `Rs.${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '4 4' }}
                            formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTotal)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TotalRevenueChart;
