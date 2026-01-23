'use client';

import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { fetchOrders, updateOrderStatus, deleteOrder } from '../../api/api';
import { OrdersHeader } from '../../components/orders/OrdersHeader';
import { OrdersTable } from '../../components/orders/OrdersTable';
import { ViewOrderCard } from '../../components/orders/ViewOrderCard';
import { UpdateStatusModal } from '../../components/orders/UpdateStatusModal';
import OrderForm from '@/src/components/orders/OrderFormModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<Order | null>(null);
  const [edit, setEdit] = useState<Order | null>(null);
  const [showCreate, setShowCreate] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <OrdersHeader
        search={search}
        setSearch={setSearch}
        onAddNew={() => setShowCreate((prev) => !prev)}
      />

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE - CREATE ORDER FORM */}
        <div className="lg:col-span-1 bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Create Order</h2>

          {showCreate && (
            <OrderForm
              onSubmit={async (data) => {
                await fetch('http://127.0.0.1:5000/orders', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });

                setShowCreate(false);
                load();
              }}
            />
          )}
        </div>

        {/* RIGHT SIDE - ORDERS TABLE */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-4 shadow-sm">
          <OrdersTable
            orders={orders.filter((o) =>
              o.customer_name.toLowerCase().includes(search.toLowerCase())
            )}
            onView={setView}
            onUpdate={setEdit}
            onDelete={async (id) => {
              await deleteOrder(id);
              load();
            }}
          />
        </div>
      </div>

      {/* VIEW ORDER */}
      {view && (
        <ViewOrderCard
          order={view}
          onClose={() => setView(null)}
        />
      )}

      {/* UPDATE STATUS MODAL */}
      {edit && (
        <UpdateStatusModal
          order={edit}
          onClose={() => setEdit(null)}
          onSave={async (status: string) => {
            await updateOrderStatus(edit.id, status);
            setEdit(null);
            load();
          }}
        />
      )}
    </div>
  );
}
