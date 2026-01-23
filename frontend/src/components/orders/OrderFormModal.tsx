'use client';

import { useState } from 'react';
import { ShoppingCart, Trash2, Plus, User, CreditCard, Package } from 'lucide-react';

interface OrderItem {
  product_id: number;
  item_name: string;
  quantity: number;
  price: number;
}

interface Props {
  onSubmit: (data: any) => void;
}

export default function OrderForm({ onSubmit }: Props) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('DELIVERY');
  const [paymentType, setPaymentType] = useState('CASH');

  const [items, setItems] = useState<OrderItem[]>([
    { product_id: 0, item_name: '', quantity: 1, price: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { product_id: 0, item_name: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!customerName || items.length === 0) {
      alert('Customer name and items are required');
      return;
    }

    onSubmit({
      customer_name: customerName,
      order_type: orderType,
      payment_type: paymentType,
      items
    });
  };

  const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Order</h1>
          <p className="text-gray-600">Fill in the details to process your order</p>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE - Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information Card */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all text-gray-800"
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Package className="w-4 h-4 inline mr-1" />
                      Order Type
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-800 bg-white"
                    >
                      <option value="DINE_IN">🍽️ Dine In</option>
                      <option value="TAKE_AWAY">🥡 Take Away</option>
                      <option value="DELIVERY">🚚 Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CreditCard className="w-4 h-4 inline mr-1" />
                      Payment Type
                    </label>
                    <select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-800 bg-white"
                    >
                      <option value="CASH">💵 Cash</option>
                      <option value="CARD">💳 Card</option>
                      <option value="ONLINE">🌐 Online</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
                </div>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 mb-3">
                  <input
                    type="number"
                    placeholder="ID"
                    value={item.product_id || ''}
                    onChange={(e) => updateItem(index, 'product_id', Number(e.target.value))}
                    className="col-span-2 px-3 py-2 border rounded-lg"
                  />

                  <input
                    value={item.item_name}
                    disabled
                    className="col-span-4 px-3 py-2 border rounded-lg bg-gray-100"
                  />

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                    className="col-span-2 px-3 py-2 border rounded-lg"
                  />

                  <input
                    value={item.price}
                    disabled
                    className="col-span-3 px-3 py-2 border rounded-lg bg-gray-100"
                  />

                  <button
                    onClick={() => removeItem(index)}
                    className="col-span-1 text-red-600"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className=" rounded-lg p-3 border border-gray-100">
                  <div className="text-sm text-gray-600">Customer Name</div>
                  <div className="font-semibold text-gray-800 truncate">
                    {customerName || 'Not specified'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3 border border-gray-100">
                    <div className="text-xs text-gray-600">Order Type</div>
                    <div className="font-semibold text-sm text-gray-800">
                      {orderType.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="rounded-lg p-3 border border-gray-100">
                    <div className="text-xs text-gray-600">Payment</div>
                    <div className="font-semibold text-sm text-gray-800">{paymentType}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-3">Items ({items.length})</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {items.filter(i => i.item_name).map((item, index) => (
                    <div key={index} className="flex justify-between items-start text-sm bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{item.item_name}</div>
                        <div className="text-xs text-gray-500">
                          {item.quantity} × Rs. {item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-800">
                        Rs. {(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {items.filter(i => i.item_name).length === 0 && (
                    <div className="text-center text-gray-400 py-8 text-sm">
                      No items added yet
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-indigo-600">Rs. {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold hover:from-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>

  );
}