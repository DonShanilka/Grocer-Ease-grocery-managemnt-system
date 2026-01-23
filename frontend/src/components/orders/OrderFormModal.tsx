'use client';

import { useState } from 'react';

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
    updated[index][field] as any == value;
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

  return (
    <div className="max-w-[50%] h-[50vh] mx-auto p-4 bg-white rounded-lg shadow text-black overflow-y-auto">

      <h2 className="text-xl font-bold mb-4 text-center">
        Create New Order
      </h2>

      {/* CUSTOMER NAME */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Customer Name *</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-black text-sm"
          placeholder="Enter customer name"
        />
      </div>

      {/* ORDER TYPE & PAYMENT TYPE */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div>
          <label className="block mb-1">Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg text-black text-sm"
          >
            <option value="DINE_IN">Dine In</option>
            <option value="TAKE_AWAY">Take Away</option>
            <option value="DELIVERY">Delivery</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Payment Type</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg text-black text-sm"
          >
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="ONLINE">Online</option>
          </select>
        </div>
      </div>

      {/* ORDER ITEMS */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold mb-2">Order Items</h3>
        <div className="space-y-1 max-h-[150px] overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-1">

              <input
                type="number"
                placeholder="ID"
                value={item.product_id}
                onChange={(e) => updateItem(index, 'product_id', Number(e.target.value))}
                className="px-2 py-1 border rounded-lg text-black text-sm"
              />

              <input
                placeholder="Item"
                value={item.item_name}
                onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                className="col-span-2 px-2 py-1 border rounded-lg text-black text-sm"
              />

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                className="px-2 py-1 border rounded-lg text-black text-sm"
              />

              <div className="flex gap-1">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                  className="px-2 py-1 border rounded-lg w-full text-black text-sm"
                />
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 px-1 rounded hover:bg-red-100"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOTAL */}
      <div className="flex justify-between font-semibold text-sm mb-3">
        <span>Total</span>
        <span>Rs. {total.toFixed(2)}</span>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
        Create Order
      </button>

    </div>
  );
}
