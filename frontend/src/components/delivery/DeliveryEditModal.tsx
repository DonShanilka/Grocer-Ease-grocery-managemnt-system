"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Loader2, User, Phone, Truck, CheckCircle } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-blue-800">
              Update Delivery
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Ref ID: #{delivery.order_id || delivery.id}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          <form id="delivery-form" onSubmit={handleSubmit} className="space-y-5">

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                Delivery Status
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <CheckCircle size={16} />
                </div>
                <select
                  name="delivery_status"
                  value={formData.delivery_status || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>

            {/* Assigned Driver */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                Assigned Driver
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Truck size={16} />
                </div>
                <input
                  type="text"
                  name="assigned_driver"
                  value={formData.assigned_driver || ""}
                  onChange={handleChange}
                  placeholder="Enter driver name or ID"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                Contact Phone
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone size={16} />
                </div>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone || ""}
                  onChange={handleChange}
                  placeholder="+94 ..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 z-10 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="delivery-form"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};