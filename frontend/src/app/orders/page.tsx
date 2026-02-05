"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, ChevronRight, Package, Clock, CheckCircle2, Search } from "lucide-react";

import OrderForm from "@/src/components/orders/OrderFormModal";
import { OrdersTable } from "../../components/orders/OrdersTable";
import { ViewOrderCard } from "../../components/orders/ViewOrderCard";

import { RootState, AppDispatch } from "@/src/store/Store";
import { fetchOrders, createOrder, deleteOrder } from "@/src/reducer/OrderSlice";
import type { Order } from "@/src/types/Order";

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCreateOrder = useCallback(
    async (formData: any) => {
      try {
        await dispatch(createOrder(formData)).unwrap();
        // Custom toast logic could go here, using standard alert for now
        alert("Transaction completed successfully");
      } catch (err: any) {
        console.error("Operation failed: ", err);
        const errorMessage = err.message || "Failed to process transaction";
        alert(`Error: ${errorMessage}`);
      }
    },
    [dispatch]
  );

  const handleDeleteOrder = useCallback(
    (id: number) => {
      if (window.confirm("Are you sure you want to permanently delete this record?")) {
        dispatch(deleteOrder(id));
      }
    },
    [dispatch]
  );

  return (
    <div className="min-h-screen bg-white font-[Outfit, sans-serif]">
      <div className="p-8 lg:p-12">
        <div className="max-w-[1600px] mx-auto space-y-12">
          {/* Header & Stats Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-700 font-black uppercase tracking-[0.2em] text-[10px]">
                <ShoppingBag className="w-3 h-3" />
                Distribution Hub
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tight">Order Console</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:w-1/2">
              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-4 h-4 text-blue-700" />
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Total</span>
                </div>
                <div className="text-3xl font-black text-gray-900">{orders.length}</div>
              </div>
              <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-50">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pending</span>
                </div>
                <div className="text-3xl font-black text-gray-900">
                  {orders.filter(o => o.status === 'pending').length}
                </div>
              </div>
              <div className="hidden md:block bg-emerald-50/50 p-6 rounded-3xl border border-emerald-50">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Fulfilled</span>
                </div>
                <div className="text-3xl font-black text-gray-900">
                  {orders.filter(o => o.status === 'completed').length}
                </div>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-1 gap-12">
            {/* Create Order Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-black">01</span>
                  Transaction Entry
                </h2>
              </div>
              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden shadow-blue-900/5">
                <OrderForm onSubmit={handleCreateOrder} />
              </div>
            </section>

            {/* List Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-black">02</span>
                  Operation Log
                </h2>

                <div className="relative group hidden md:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-700 transition-colors" />
                  <input
                    type="text"
                    placeholder="Quick search records..."
                    className="pl-12 pr-6 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-blue-700 rounded-2xl outline-none text-sm font-bold w-64 transition-all border-2"
                  />
                </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl p-4 overflow-hidden shadow-blue-900/5">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-12 h-12 border-4 border-blue-50 border-t-blue-700 rounded-full animate-spin"></div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Accessing ledger...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-24">
                    <div className="bg-rose-50 text-rose-700 px-6 py-4 rounded-3xl inline-block font-bold">
                      Connection Error: {error}
                    </div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-24 space-y-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No transactions logged</p>
                  </div>
                ) : (
                  <OrdersTable
                    orders={orders as any}
                    onView={(order) => setViewOrder(order)}
                    onDelete={handleDeleteOrder}
                  />
                )}
              </div>
            </section>
          </div>
        </div>

        {/* View Modal */}
        {viewOrder && (
          <ViewOrderCard
            order={viewOrder}
            onClose={() => setViewOrder(null)}
          />
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
