'use client';

import { useEffect, useState } from 'react';
import { X, User, Mail, Phone, MapPin, CheckCircle, Info, ShoppingCart, DollarSign, Calendar } from 'lucide-react';

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

  const getInitials = (name: string) => {
    return name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || "C";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "active": return "bg-green-100 text-green-700";
      case "Inactive": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formFields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Enter customer name', required: true },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'customer@email.com', required: true },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+94 XX XXX XXXX', required: true },
    { key: 'address', label: 'Address', icon: MapPin, type: 'textarea', placeholder: 'Enter full address', required: true, fullWidth: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className={`bg-white rounded-xl w-full ${mode === 'view' ? 'max-w-lg' : 'max-w-2xl'} shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200`}>
        {mode === 'view' ? (
          /* VIEW MODE - Re-styled to match SupplierView */
          <>
            <div className="relative h-24 bg-gradient-to-r from-blue-700 to-blue-900 px-6 flex items-end">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-red-500 rounded-full transition-all text-white hover:scale-110"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="absolute -bottom-10 left-6 flex items-end gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-blue-800 font-bold text-2xl">
                  {getInitials(customer.name)}
                </div>
              </div>
            </div>

            <div className="pt-14 px-6 pb-6 text-gray-800">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{customer.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                    <span className="text-gray-400 text-xs">• Joined: {customer.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Info size={14} /> Contact Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                        <Mail size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Email Address</p>
                        <p className="text-sm font-medium">{customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                        <Phone size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Phone Number</p>
                        <p className="text-sm font-medium">{customer.phone}</p>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-md">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Billing Address</p>
                        <p className="text-sm font-medium">{customer.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShoppingCart size={14} /> Activity Metrics
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Orders</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <ShoppingCart size={14} className="text-blue-600" />
                        {customer.totalOrders}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Lifetime Spent</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <DollarSign size={14} className="text-green-600" />
                        {customer.totalSpent}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-bold shadow-sm"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          /* CREATE & EDIT MODE - Keeping existing improved layout */
          <>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-blue-800">
                  {mode === 'create' ? 'Add New Customer' : 'Edit Customer'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {mode === 'create' ? 'Fill in customer details' : 'Update customer information'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.map((field) => (
                  <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <field.icon size={16} />
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
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 transition-all ${errors[field.key] ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'}`}
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
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 transition-all ${errors[field.key] ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'}`}
                        />
                      )}
                    </div>
                    {errors[field.key] && <p className="text-xs text-red-600 mt-1">{errors[field.key]}</p>}
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-800 mb-1.5">Status</label>
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
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 z-10">
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
          </>
        )}
      </div>
    </div>
  );
}
