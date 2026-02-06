"use client";
import React from "react";
import { Delivery } from "../../types/Delivery";
import { Package } from "lucide-react";

interface Props {
  shipments: Delivery[];
  onView: (shipment: Delivery) => void;
  onEdit: (shipment: Delivery) => void;
}

export const ShipmentsTable = ({ shipments, onView, onEdit }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-100";
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-100";
      case "returned":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="bg-white w-full rounded-lg border border-gray-50 overflow-hidden px-6 mb-6">
      <div className="overflow-x-scroll">
        {/* TABLE HEADER */}
        <table className="w-full border-collapse">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              {["ID", "Phone ", "Status", "Assigned Driver", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs font-semibold text-black"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
        </table>

        {/* SCROLL BODY */}
        <div className="max-h-[280px] overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {shipments.map((shipment) => (
                <tr
                  key={shipment.order_id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-xs font-medium text-gray-800">
                    {shipment.id}
                  </td>
                  {/* <td className="py-3 px-4 text-xs font-medium text-gray-800">
                {shipment.delivery_address}
              </td> */}

                  <td className="py-3 px-4 text-xs text-gray-800">
                    {shipment.contact_phone}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-opacity-90 ${getStatusColor(
                        shipment.delivery_status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60"></span>
                      {shipment.delivery_status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-xs text-gray-800">
                    {shipment.assigned_driver ?? "Unassigned"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => onView(shipment)}
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
                        onClick={() => onEdit(shipment)}
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {shipments.length === 0 && (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No deliveries found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
