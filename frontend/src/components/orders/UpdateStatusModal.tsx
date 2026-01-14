'use client';
import { X } from 'lucide-react';
import { useState } from 'react';

export const UpdateStatusModal = ({ order, onSave, onClose }: any) => {
  const [status, setStatus] = useState(order.status);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Update Status</h2>
          <button onClick={onClose}><X/></button>
        </div>

        <select value={status} onChange={e=>setStatus(e.target.value)}
          className="w-full border p-2 rounded">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button
          onClick={()=>onSave(status)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
};
