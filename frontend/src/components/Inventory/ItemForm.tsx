'use client';
import { X } from 'lucide-react';
import { InventoryItem } from '../../types/item';
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

  const categories = ['Fresh Produce', 'Dairy Products', 'Bakery Products', 'Grocery Products', 'Beverages', 'Frozen Items'];
  const units = ['kg', 'liters', 'pieces', 'boxes', 'bags', 'bottles', 'grams'];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock', 'Reorder Needed'];

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.quantity) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit({ ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) });
  };

  return (
    <div className="fixed inset-0 bg-black/70 transition-opacity flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">{mode === 'create' ? 'Add New Product' : 'Edit Product'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"/>
          </div>
          {/* Category / Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select category</option>
                {categories.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input type="number" step="0.01" value={formData.price} onChange={(e)=>setFormData({...formData,price:e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>
          {/* Quantity / Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
              <input type="number" value={formData.quantity} onChange={(e)=>setFormData({...formData,quantity:e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
              <select value={formData.unit} onChange={(e)=>setFormData({...formData,unit:e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select unit</option>
                {units.map(u=> <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          {/* Supplier / Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
            <input type="text" value={formData.supplier} onChange={(e)=>setFormData({...formData,supplier:e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select value={formData.status} onChange={(e)=>setFormData({...formData,status:e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
              {statuses.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSubmit} className="flex-1 bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700">{mode==='create'?'Add Product':'Save Changes'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
