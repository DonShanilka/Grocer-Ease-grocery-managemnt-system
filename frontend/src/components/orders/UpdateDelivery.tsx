'use client';

export const UpdateDeliveryForm = ({ onSave }: { onSave: (data: any) => void }) => {
  return (
    <div className="bg-white p-5 rounded-lg w-96">
      <h3 className="text-sm font-semibold mb-4">Update Delivery</h3>

      <select className="w-full border px-3 py-2 text-xs rounded mb-3">
        <option>PENDING</option>
        <option>OUT_FOR_DELIVERY</option>
        <option>COMPLETED</option>
      </select>

      <input
        placeholder="Delivery Address"
        className="w-full border px-3 py-2 text-xs rounded mb-3"
      />

      <input
        placeholder="Contact Phone"
        className="w-full border px-3 py-2 text-xs rounded mb-3"
      />

      <input
        placeholder="Assigned Driver"
        className="w-full border px-3 py-2 text-xs rounded mb-4"
      />

      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 text-xs border rounded">
          Cancel
        </button>
        <button className="px-4 py-2 text-xs bg-green-600 text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
};
