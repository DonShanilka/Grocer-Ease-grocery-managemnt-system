'use client';
import { Package, TrendingDown, AlertTriangle } from 'lucide-react';
import { InventoryItem } from '../../types/item';

interface Props { inventory: InventoryItem[] }

export const StatsCards = ({ inventory }: Props) => {
  const totalProducts = inventory.length;
  const belowThreshold = inventory.filter(i => i.quantity < 20).length;
  const lowStock = inventory.filter(i => i.status.toLowerCase() === 'low stock').length;
  const reorderNeeded = inventory.filter(i => i.status.toLowerCase() === 'reorder needed').length;

  const cards = [
    { title: 'Total Products', value: totalProducts, icon: Package, color: 'blue' },
    { title: 'Below Threshold', value: belowThreshold, icon: TrendingDown, color: 'green' },
    { title: 'Low Stock', value: lowStock, icon: AlertTriangle, color: 'yellow' },
    { title: 'Reorders Needed', value: reorderNeeded, icon: AlertTriangle, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white p-4 rounded-lg border border-gray-50">
          <div className="flex items-start justify-between ">
            <div>
              <p className="text-xs text-gray-600 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.value} items</h3>
            </div>
            <div className={`w-12 h-12 bg-${card.color}-100 rounded-full flex items-center justify-center`}>
              <card.icon size={24} className={`text-${card.color}-600`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
