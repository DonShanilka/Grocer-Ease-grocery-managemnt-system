import { Users } from 'lucide-react';

export default function CustomersTable({ customers, onView, onEdit, onDelete }: any) {
  if (!customers.length) {
    return (
      <div className="text-center py-12">
        <Users size={48} className="mx-auto text-gray-400" />
        <p>No customers found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Address</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c: any) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.address}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onView(c)}>View</button>
                <button onClick={() => onEdit(c)}>Edit</button>
                <button onClick={() => onDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
