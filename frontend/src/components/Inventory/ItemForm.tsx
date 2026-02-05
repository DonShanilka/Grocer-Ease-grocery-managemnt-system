'use client';
import { X, Package, Tag, DollarSign, Hash, Layers, FileText, User, CheckCircle } from 'lucide-react';
import { InventoryItem } from '../../types/Items';
import { useState } from 'react';

interface Props {
  mode: 'create' | 'edit';
  item?: InventoryItem;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ItemForm = ({ mode, item, onClose, onSubmit }: Props) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || '',
    price: item?.price?.toString() || '',
    quantity: item?.quantity?.toString() || '',
    unit: item?.unit || '',
    description: item?.description || '',
    supplier: item?.supplier || '',
    status: item?.status || 'In Stock'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Fresh Produce', 'Dairy Products', 'Bakery Products', 'Grocery Products', 'Beverages', 'Frozen Items'];
  const units = ['kg', 'liters', 'pieces', 'boxes', 'bags', 'bottles', 'grams'];
  const statuses = ['available', 'Low Stock', 'Out of Stock', 'Reorder Needed'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.quantity || parseInt(formData.quantity) < 0) newErrors.quantity = 'Valid quantity is required';
    if (!formData.unit) newErrors.unit = 'Unit is required';
    if (!formData.supplier.trim()) newErrors.supplier = 'Supplier is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) });
    }
  };

  const formFields = [
    { key: 'name', label: 'Product Name', icon: Package, type: 'text', placeholder: 'Enter product name', required: true, fullWidth: true },
    { key: 'category', label: 'Category', icon: Tag, type: 'select', options: categories, required: true },
    { key: 'price', label: 'Price (Rs.)', icon: DollarSign, type: 'number', placeholder: '0.00', required: true },
    { key: 'quantity', label: 'Quantity', icon: Hash, type: 'number', placeholder: '0', required: true },
    { key: 'unit', label: 'Unit', icon: Layers, type: 'select', options: units, required: true },
    { key: 'supplier', label: 'Supplier', icon: User, type: 'text', placeholder: 'Enter supplier name', required: true, fullWidth: true },
    { key: 'status', label: 'Status', icon: CheckCircle, type: 'select', options: statuses, fullWidth: true },
    { key: 'description', label: 'Description', icon: FileText, type: 'textarea', placeholder: 'Enter product description', fullWidth: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-800">{mode === 'create' ? 'Add New Product' : 'Edit Product'}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{mode === 'create' ? 'Fill in the product details' : 'Update product information'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-4">
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
                    {field.type === 'select' ? (
                      <select
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => {
                          setFormData({ ...formData, [field.key]: e.target.value });
                          if (errors[field.key]) setErrors({ ...errors, [field.key]: '' });
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 transition-all appearance-none bg-white ${errors[field.key] ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                          }`}
                      >
                        <option value="">Select {field.label.toLowerCase()}</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        rows={3}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    ) : (
                      <input
                        type={field.type}
                        step={field.type === 'number' && field.key === 'price' ? '0.01' : undefined}
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
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            {mode === 'create' ? 'Add Product' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
