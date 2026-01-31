"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderForm from "@/src/components/orders/OrderFormModal";
import { OrdersTable } from "../../components/orders/OrdersTable";
import { ViewOrderCard } from "../../components/orders/ViewOrderCard";

import { RootState, AppDispatch } from "@/src/store/Store";
import { fetchOrders, createOrder, deleteOrder } from "@/src/reducer/OrderSlice";
import type { Order } from "@/src/types/Order";

export default function OrdersPage() {

  const dispatch = useDispatch<AppDispatch>();
  const {orders, loading, error} = useSelector((state: RootState) => state.orders);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCreateOrder = useCallback(
    async (formData: any) => {
      try {
        await dispatch(createOrder(formData)).unwrap();
        alert("Order Created SuccessFully");
      } catch (err: any) {
        console.error("Order Creation Failed: ", err);
        const errorMassage = err.message || "Cloud not create Order";
        alert(`Error: ${errorMassage}`);
      }
    },
    [dispatch]
  )

  const handleDeleteOrder = useCallback(
    (id: number) => {
      if (window.confirm("Are you sure you want to delete this order?")) {
        dispatch(deleteOrder(id));
      }
    },
    [dispatch]
  );
  
  return (
    <div>
      <div className="p-6 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Create New Order
                </h2>
      
                <OrderForm onSubmit={handleCreateOrder} />
              </div>
      
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Orders List
                </h2>
      
                {loading ? (
                  <div className="text-center py-12 text-gray-500">
                    Loading orders...
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-red-600 font-medium">
                    Error: {error}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No orders found
                  </div>
                ) : (
                  <OrdersTable
                    orders={orders as any}
                    onView={(order) => setViewOrder(order)}
                    onDelete={handleDeleteOrder}
                  />
                )}
              </div>
            </div>
      
            {viewOrder && (
              <ViewOrderCard
                order={viewOrder}
                onClose={() => setViewOrder(null)}
              />
            )}
          </div>
    </div>
  )
}


