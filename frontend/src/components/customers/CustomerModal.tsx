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

const emptyItem: OrderItem = {
  product_id: 0,
  item_name: '',
  quantity: 1,
  price: 0
};

export default function OrderForm({ onSubmit }: Props) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('DELIVERY');
  const [paymentType, setPaymentType] = useState('CASH');

  const [items, setItems] = useState<OrderItem[]>([emptyItem]);

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: any
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };

    setItems(() => {
      // if last row is being edited and becomes non-empty → add new row
      const isLast = index === items.length - 1;
      const hasData =
        updated[index].item_name ||
        updated[index].product_id ||
        updated[index].price > 0;

      if (isLast && hasData) {
        return [...updated, emptyItem];
      }

      return updated;
    });
  };

  const removeItem = (index: number) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered.length ? filtered : [emptyItem]);
  };

  const handleSubmit = () => {
    const validItems = items.filter(
      (i) => i.item_name && i.quantity > 0 && i.price > 0
    );

    if (!customerName || validItems.length === 0) {
      alert('Customer name and at least one item are required');
      return;
    }

    onSubmit({
      customer_name: customerName,
      order_type: orderType,
      payment_type: paymentType,
      items: validItems
    });
  };

  const total = items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow text-black">

      <h2 className="text-2xl font-bold mb-6">
        Create New Order
      </h2>

      {/* CUSTOMER NAME */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Customer Name *
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* ORDER TYPE & PAYMENT */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="DINE_IN">Dine In</option>
          <option value="TAKE_AWAY">Take Away</option>
          <option value="DELIVERY">Delivery</option>
        </select>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="ONLINE">Online</option>
        </select>
      </div>

      {/* ITEMS */}
      <h3 className="text-lg font-semibold mb-3">Order Items</h3>

      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-5 gap-3 mb-3">

          <input
            type="number"
            placeholder="Product ID"
            value={item.product_id || ''}
            onChange={(e) =>
              updateItem(index, 'product_id', Number(e.target.value))
            }
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Item name"
            value={item.item_name}
            onChange={(e) =>
              updateItem(index, 'item_name', e.target.value)
            }
            className="col-span-2 border px-3 py-2 rounded"
          />

          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) =>
              updateItem(index, 'quantity', Number(e.target.value))
            }
            className="border px-3 py-2 rounded"
          />

          <div className="flex gap-2">
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                updateItem(index, 'price', Number(e.target.value))
              }
              className="border px-3 py-2 rounded w-full"
            />

            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 px-2"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div className="flex justify-between font-semibold text-lg my-6">
        <span>Total</span>
        <span>Rs. {total.toFixed(2)}</span>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Create Order
      </button>

    </div>
  );
}
