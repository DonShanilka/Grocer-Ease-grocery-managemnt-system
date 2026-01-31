"use client";

import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { fetchOrders, deleteOrder } from "../../api/api";
import { OrdersTable } from "../../components/orders/OrdersTable";
import { ViewOrderCard } from "../../components/orders/ViewOrderCard";
import OrderForm from "@/src/components/orders/OrderFormModal";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<Order | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  return (
    <div className="p-6">
      {/* PAGE GRID */}
      <div>
        {/* LEFT: CREATE ORDER */}

        <h2 className="text-lg font-semibold mb-4">Create Order</h2>

        <OrderForm
          onSubmit={async (data) => {
            try {
              const res = await fetch("http://127.0.0.1:5000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              if (!res.ok) {
                const text = await res.text();
                console.error("Backend error:", text);
                alert("Error: " + text);
                return;
              }

              alert("Order created successfully!");
              load();
            } catch (err) {
              console.error("Network error:", err);
              alert("Network error");
            }
          }}
        />
      </div>

      {/* VIEW ORDER MODAL */}
      {view && <ViewOrderCard order={view} onClose={() => setView(null)} />}
    </div>
  );
}
