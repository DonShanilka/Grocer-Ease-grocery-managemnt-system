import { Supplier } from "@/src/types/Supplier";

interface Props {
  suppliers: Supplier[];
  onView: (s: Supplier) => void;
  onEdit: (s: Supplier) => void;
  onDelete: (id: number) => void;
}

export default function SupplierTable({ suppliers, onView, onEdit, onDelete }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-100";
      case "active":
        return "bg-green-50 text-green-700 border-green-100";
      case "Inactive":
        return "bg-red-50 text-red-700 border-red-100";
      case "inactive":
        return "bg-red-50 text-red-700 border-red-100";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-50 overflow-hidden">
      <div className="overflow-x-auto">
        {/* HEADER TABLE */}
        <table className="w-full border-collapse">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              {["Name", "Phone", "Email", "Item", "Qty", "Price", "Status", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-black">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* SCROLL BODY */}
        <div className="max-h-[240px] overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs font-medium text-gray-800">{s.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-800">{s.phone}</td>
                  <td className="px-4 py-3 text-xs text-gray-800">{s.email}</td>
                  <td className="px-4 py-3 text-xs text-gray-800">{s.supplied_items}</td>
                  <td className="px-4 py-3 text-xs text-gray-800">{s.qty}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-800">Rs. {s.price_per_unit}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusColor(s.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60"></span>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => onView(s)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(s)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(s.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {suppliers.length === 0 && (
            <p className="text-center py-6 text-gray-500">No suppliers found</p>
          )}
        </div>
      </div>
    </div>
  );
}
