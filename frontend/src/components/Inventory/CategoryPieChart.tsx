'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InventoryItem } from '../../types/item';
import { text } from 'stream/consumers';

interface Props {
  inventory: InventoryItem[];
}

export const CategoryPieChart = ({ inventory }: Props) => {
  // Aggregate quantity by category
  const categoryMap: Record<string, number> = {};
  inventory.forEach(item => {
    if (categoryMap[item.category]) categoryMap[item.category] += item.quantity;
    else categoryMap[item.category] = item.quantity;
  });

  const data = Object.entries(categoryMap).map(([category, quantity]) => ({
    name: category,
    value: quantity,
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  return (
    <div className="bg-white rounded-lg border border-gray-50 p-6 mb-6 w-5/12">
      <h3 className="text-gray-800 font-bold mb-4 text-sm">Inventory Distribution by Category</h3>
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No inventory data</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => (`${name}: ${((percent as any)*100).toFixed(0)}%`)}
              className=''
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter ={(value: any) => `${value} items`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
