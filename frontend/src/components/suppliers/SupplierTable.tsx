// components/suppliers/SupplierTable.tsx
import { Supplier } from "@/src/types/Supplier";

interface Props {
  suppliers: Supplier[];
  onView: (s: Supplier) => void;
  onEdit: (s: Supplier) => void;
  onDelete: (id: number) => void;
}

export default function SupplierTable({ suppliers, onView, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Phone", "Item", "Qty", "Price", "Status", "Actions"].map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {suppliers.map(s => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{s.name}</td>
              <td className="px-4 py-3">{s.phone}</td>
              <td className="px-4 py-3">{s.supplied_items}</td>
              <td className="px-4 py-3">{s.qty}</td>
              <td className="px-4 py-3">${s.price_per_unit}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                  {s.status}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2 text-sm">
                <button onClick={() => onView(s)} className="text-blue-600">View</button>
                <button onClick={() => onEdit(s)} className="text-green-600">Edit</button>
                <button onClick={() => onDelete(s.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {suppliers.length === 0 && (
        <p className="text-center py-6 text-gray-500">No suppliers found</p>
      )}
    </div>
  );
}
