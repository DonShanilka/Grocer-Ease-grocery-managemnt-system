'use client';
import { Order } from '../../types/Order';

interface Props {
  orders: Order[];
  onView: (o: Order) => void;
  onUpdate: (o: Order) => void;
  onDelete: (id: number) => void;
}

export const OrdersTable = ({ orders, onView, onUpdate, onDelete }: Props) => {
  const badge = (status: string) =>
    status === 'completed'
      ? 'bg-green-100 text-green-700'
      : status === 'pending'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-red-100 text-red-700';

  return (
    <table className="w-full bg-white rounded-lg border">
      <thead>
        <tr className="border-b text-xs font-semibold">
          {['Order ID','Customer','Amount','Status','Actions'].map(h=>(
            <th key={h} className="text-left px-4 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map(o=>(
          <tr key={o.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 text-sm">{o.id}</td>
            <td className="px-4 py-3 text-sm">{o.customer_name}</td>
            <td className="px-4 py-3 text-sm">${o.total_amount}</td>
            <td className="px-4 py-3">
              <span className={`px-3 py-1 rounded-full text-xs ${badge(o.status)}`}>
                {o.status}
              </span>
            </td>
            <td className="px-4 py-3 flex gap-2">
              <button onClick={()=>onView(o)} className="text-blue-600">View</button>
              <button onClick={()=>onUpdate(o)} className="text-green-600">Update</button>
              <button onClick={()=>onDelete(o.id)} className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
