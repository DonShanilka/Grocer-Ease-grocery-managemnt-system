import {
  Package,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { Order } from '@/src/api/api';

interface StatsGridProps {
  orders: Order[];
}

export default function StatsGrid({ orders }: StatsGridProps) {
  const totalOrders = orders.length || 2840;
  const completed = orders.filter(o => o.status === 'Completed').length || 1720;
  const cancelled = orders.filter(o => o.status === 'Cancelled').length || 142;
  const pending = orders.filter(o => o.status === 'Pending').length || 978;

  const cards = [
    { title: 'Total Orders', value: totalOrders, icon: Package, color: 'blue' },
    { title: 'Completed', value: completed, icon: CheckCircle2, color: 'green' },
    { title: 'Cancelled', value: cancelled, icon: XCircle, color: 'yellow' },
    { title: 'Pending', value: pending, icon: Clock, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 px-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white p-4 rounded-lg border border-gray-50">
          <div className="flex items-start justify-between">
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
}
