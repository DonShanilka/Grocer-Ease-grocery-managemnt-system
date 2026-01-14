'use client';
import { X } from 'lucide-react';
import { Order } from '../../types/Order';

export const ViewOrderCard = ({ order, onClose }:{order:Order,onClose:()=>void}) => (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Order Details</h2>
        <button onClick={onClose}><X/></button>
      </div>
      <p><b>ID:</b> {order.id}</p>
      <p><b>Customer:</b> {order.customer_name}</p>
      <p><b>Amount:</b> ${order.total_amount}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Date:</b> {order.created_at}</p>
    </div>
  </div>
);
