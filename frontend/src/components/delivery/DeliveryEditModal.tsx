"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Delivery } from "@/src/types/Delivery"; 

interface DeliveryEditModalProps {
  delivery: Delivery;
  onSubmit: (updatedData: Partial<Delivery>) => void;
  onClose: () => void;
  isSubmitting?: boolean; 
}

export const DeliveryEditModal = ({
  delivery,
  onSubmit,
  onClose,
  isSubmitting = false,
}: DeliveryEditModalProps) => {

  const [formData, setFormData] = useState<Partial<Delivery>>({
    delivery_status: delivery.delivery_status,
    assigned_driver: delivery.assigned_driver || "",
    contact_phone: delivery.contact_phone || "",
  });

  useEffect(() => {
    setFormData({
      delivery_status: delivery.delivery_status,
      assigned_driver: delivery.assigned_driver || "",
      contact_phone: delivery.contact_phone || "",
    });
  }, [delivery]);

  const handleChange = (
    e: any
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Delivery #{delivery.id}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Status
              </label>
              <select
                name="delivery_status"
                value={formData.delivery_status || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="pending">Pending</option>
                <option value="in-transit">In Transit</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
              </select>
            </div>

            {/* Assigned Driver */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned Driver
              </label>
              <input
                type="text"
                name="assigned_driver"
                value={formData.assigned_driver || ""}
                onChange={handleChange}
                placeholder="Enter driver name or ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone || ""}
                onChange={handleChange}
                placeholder="+94 ..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};