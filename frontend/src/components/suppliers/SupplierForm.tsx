import { useState } from "react";
import { X, User, Phone, Mail, MapPin, Package, DollarSign, Hash, CheckCircle } from "lucide-react";
import { Supplier } from "@/src/types/Supplier";

interface Props {
  supplier?: Supplier;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function SupplierForm({ supplier, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    name: supplier?.name || "",
    phone: supplier?.phone || "",
    email: supplier?.email || "",
    address: supplier?.address || "",
    supplied_items: supplier?.supplied_items || "",
    price_per_unit: supplier?.price_per_unit || "",
    qty: supplier?.qty || "",
    status: supplier?.status || "Active",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Supplier name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.supplied_items.trim()) newErrors.supplied_items = "Supplied items are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(form);
    }
  };

  const formFields = [
    { key: "name", label: "Supplier Name", icon: User, type: "text", placeholder: "Enter supplier name" },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+94 XX XXX XXXX" },
    { key: "email", label: "Email Address", icon: Mail, type: "email", placeholder: "supplier@example.com" },
    { key: "address", label: "Address", icon: MapPin, type: "text", placeholder: "Enter full address" },
    { key: "supplied_items", label: "Supplied Items", icon: Package, type: "text", placeholder: "e.g., Rice, Oil, Flour" },
    { key: "price_per_unit", label: "Price Per Unit (Rs.)", icon: DollarSign, type: "number", placeholder: "0.00" },
    { key: "qty", label: "Quantity", icon: Hash, type: "number", placeholder: "0" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-800">
              {supplier ? "Edit Supplier" : "Add New Supplier"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {supplier ? "Update supplier information" : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className={field.key === "address" || field.key === "supplied_items" ? "md:col-span-2" : ""}>
                  <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                    {field.label}
                    {["name", "phone", "email", "address", "supplied_items"].includes(field.key) && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Icon size={16} />
                    </div>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => {
                        setForm({ ...form, [field.key]: e.target.value });
                        if (errors[field.key]) {
                          setErrors({ ...errors, [field.key]: "" });
                        }
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 transition-all ${errors[field.key]
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                        }`}
                    />
                  </div>
                  {errors[field.key] && (
                    <p className="text-xs text-red-600 mt-1">{errors[field.key]}</p>
                  )}
                </div>
              );
            })}

            {/* Status Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                Status
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <CheckCircle size={16} />
                </div>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {supplier ? "Update Supplier" : "Add Supplier"}
          </button>
        </div>
      </div>
    </div>
  );
}
