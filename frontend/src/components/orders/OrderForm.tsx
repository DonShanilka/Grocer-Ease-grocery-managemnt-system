'use client';

import { useState } from "react";
import { ORDER_TYPES, PAYMENT_TYPES } from "@/src/constants/orderEnums";

export const CreateOrderForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [orderType, setOrderType] = useState("TAKEAWAY");

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-sm font-semibold mb-4">Create Order</h3>

      <input
        placeholder="Customer Name"
        className="w-full border px-3 py-2 text-xs rounded mb-3"
      />

      <select
        className="w-full border px-3 py-2 text-xs rounded mb-3"
        onChange={(e) => setOrderType(e.target.value)}
      >
        {ORDER_TYPES.map(t => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <select className="w-full border px-3 py-2 text-xs rounded mb-3">
        {PAYMENT_TYPES.map(p => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {orderType === "DELIVERY" && (
        <>
          <input
            placeholder="Delivery Address"
            className="w-full border px-3 py-2 text-xs rounded mb-3"
          />
          <input
            placeholder="Contact Phone"
            className="w-full border px-3 py-2 text-xs rounded mb-3"
          />
        </>
      )}

      <button className="bg-orange-500 text-white px-4 py-2 rounded text-xs">
        Place Order
      </button>
    </div>
  );
};
