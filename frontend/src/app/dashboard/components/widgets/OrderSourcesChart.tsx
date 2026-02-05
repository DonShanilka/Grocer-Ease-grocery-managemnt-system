import { TrendingUp, Globe, Smartphone, Store, ArrowUpRight, ArrowDownRight, Clock, DollarSign } from 'lucide-react';
import { Order } from '@/src/api/api';

interface OrderSourcesChartProps {
  orders: Order[];
}

export default function OrderSourcesChart({ orders }: OrderSourcesChartProps) {
  const total = orders.length || 2350;

  const websiteCount = Math.floor(total * 0.4);
  const mobileCount = Math.floor(total * 0.35);
  const storeCount = total - websiteCount - mobileCount;

  const sources = [
    {
      name: 'Website Orders',
      count: websiteCount,
      percentage: 40,
      avgValue: 'Rs. 1,250',
      trend: '+8.2%',
      trendUp: true,
      peakTime: '2-4 PM',
      icon: Globe,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      barColor: 'bg-blue-500'
    },
    {
      name: 'Mobile App',
      count: mobileCount,
      percentage: 35,
      avgValue: 'Rs. 980',
      trend: '+15.3%',
      trendUp: true,
      peakTime: '6-8 PM',
      icon: Smartphone,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      barColor: 'bg-purple-500'
    },
    {
      name: 'In-Store',
      count: storeCount,
      percentage: 25,
      avgValue: 'Rs. 1,450',
      trend: '-2.1%',
      trendUp: false,
      peakTime: '10-12 AM',
      icon: Store,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      barColor: 'bg-green-500'
    }
  ];

  return (
    <div className="bg-white w-full lg:w-5/12 rounded-lg border border-gray-50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <TrendingUp size={16} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">Order Sources</h2>
            <p className="text-[10px] text-gray-500">Channel Performance</p>
          </div>
        </div>
        <select className="px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>This Month</option>
          <option>This Week</option>
          <option>Today</option>
        </select>
      </div>

      {/* Total Orders Summary */}
      <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{total.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mb-0.5">
              <ArrowUpRight size={12} />
              <span>+12.5%</span>
            </div>
            <p className="text-[10px] text-gray-500">vs last period</p>
          </div>
        </div>
      </div>

      {/* Source Breakdown */}
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name} className="group border border-gray-100 rounded-lg p-2.5 hover:border-gray-200 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${source.bgColor} rounded-lg flex items-center justify-center`}>
                  <source.icon size={16} className={source.textColor} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{source.name}</p>
                  <p className="text-[10px] text-gray-500">{source.count.toLocaleString()} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{source.percentage}%</p>
                <div className={`flex items-center gap-0.5 text-[10px] font-semibold ${source.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {source.trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  <span>{source.trend}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
              <div
                className={`${source.barColor} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${source.percentage}%` }}
              ></div>
            </div>

            {/* Additional Details */}
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1 text-gray-600">
                <DollarSign size={10} />
                <span>Avg: {source.avgValue}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock size={10} />
                <span>Peak: {source.peakTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-gray-600 text-[10px] mb-0.5">Best Channel</p>
            <p className="font-semibold text-gray-800">Website</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-gray-600 text-[10px] mb-0.5">Fastest Growing</p>
            <p className="font-semibold text-gray-800">Mobile App</p>
          </div>
        </div>
      </div>
    </div>
  );
}
