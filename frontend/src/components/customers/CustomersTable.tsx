'use client';

import { Users } from 'lucide-react';

export default function CustomersTable({
  customers,
  onView,
  onEdit,
  onDelete,
}: any) {
  if (!customers || customers.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 py-12 text-center">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 text-sm">No customers found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                Phone
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                Address
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {customers.map((customer: any) => (
              <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                {/* Customer */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {customer.name
                        ?.split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {customer.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="py-3 px-4 text-sm text-gray-800">
                  {customer.phone}
                </td>

                {/* Address */}
                <td className="py-3 px-4 text-sm text-gray-800 max-w-xs truncate">
                  {customer.address}
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${customer.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {customer.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {/* View */}
                    <button
                      onClick={() => onView(customer)}
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
                      onClick={() => onEdit(customer)}
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
                      onClick={() => onDelete(customer.id)}
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
      </div>
    </div>
  );
}
