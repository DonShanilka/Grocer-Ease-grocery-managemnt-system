'use client';

import { useEffect, useState } from 'react';
import { X, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function CustomerModal({
  mode,
  customer,
  onClose,
  onSubmit
}: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (customer && mode !== 'create') {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        status: customer.status
      });
    }
  }, [customer, mode]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Customer name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formFields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Enter customer name', required: true },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'customer@email.com', required: true },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+94 XX XXX XXXX', required: true },
    { key: 'address', label: 'Address', icon: MapPin, type: 'textarea', placeholder: 'Enter full address', required: true, fullWidth: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-800">
              {mode === 'create' && 'Add New Customer'}
              {mode === 'edit' && 'Edit Customer'}
              {mode === 'view' && 'Customer Details'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {mode === 'view' ? 'View customer information' : mode === 'create' ? 'Fill in customer details' : 'Update customer information'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          {/* VIEW MODE */}
          {mode === 'view' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {customer.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {customer.name}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${customer.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-800">
                    {customer.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-800">
                    {customer.phone}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs text-gray-600 mb-1">Address</p>
                  <p className="text-sm font-medium text-gray-800">
                    {customer.address}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Orders</p>
                  <p className="text-sm font-medium text-gray-800">
                    {customer.totalOrders}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Spent</p>
                  <p className="text-sm font-medium text-gray-800">
                    {customer.totalSpent}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Joined Date</p>
                  <p className="text-sm font-medium text-gray-800">
                    {customer.joinedDate}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* CREATE & EDIT MODE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Icon size={16} />
                      </div>
                      {field.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => {
                            setFormData({ ...formData, [field.key]: e.target.value });
                            if (errors[field.key]) setErrors({ ...errors, [field.key]: '' });
                          }}
                          placeholder={field.placeholder}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 transition-all ${errors[field.key] ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                            }`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => {
                            setFormData({ ...formData, [field.key]: e.target.value });
                            if (errors[field.key]) setErrors({ ...errors, [field.key]: '' });
                          }}
                          placeholder={field.placeholder}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 transition-all ${errors[field.key] ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                            }`}
                        />
                      )}
                    </div>
                    {errors[field.key] && <p className="text-xs text-red-600 mt-1">{errors[field.key]}</p>}
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
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode !== 'view' && (
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
              {mode === 'create' ? 'Add Customer' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
