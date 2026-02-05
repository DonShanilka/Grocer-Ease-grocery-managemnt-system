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
    <div className="h-screen bg-white font-[Outfit, sans-serif] overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-hidden">
        <div className="w-full h-full flex flex-col space-y-8 overflow-hidden">
          {/* Header & Stats Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-50 pb-6 shrink-0">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-blue-700 font-black uppercase tracking-[0.2em] text-[8px]">
                <ShoppingBag className="w-2.5 h-2.5" />
                Distribution Hub
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
                Order <span className="text-blue-700">Console</span>
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:w-[45%]">
              {/* Stats Cards (Resized as requested previously) */}
              <div className="relative group overflow-hidden bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-lg shadow-blue-900/5 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/50 rounded-full -mr-10 -mt-10" />
                <div className="relative z-10 flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-blue-700 rounded-lg">
                    <Package className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Gross</span>
                </div>
                <div className="relative z-10 text-2xl font-black text-gray-900 leading-none">{orders.length}</div>
              </div>

              <div className="relative group overflow-hidden bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-lg shadow-amber-900/5 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50/50 rounded-full -mr-10 -mt-10" />
                <div className="relative z-10 flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-amber-500 rounded-xl">
                    <Clock className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Pending</span>
                </div>
                <div className="relative z-10 text-2xl font-black text-gray-900 leading-none">
                  {orders.filter(o => o.status === 'pending').length}
                </div>
              </div>

              <div className="hidden md:block relative group overflow-hidden bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-lg shadow-emerald-900/5 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50/50 rounded-full -mr-10 -mt-10" />
                <div className="relative z-10 flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-emerald-600 rounded-xl">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Done</span>
                </div>
                <div className="relative z-10 text-2xl font-black text-gray-900 leading-none">
                  {orders.filter(o => o.status === 'completed').length}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Entry Section - Now Full Height/Width of Remaining Area */}
          <div className="flex-1 overflow-hidden min-h-0">
            <section className="h-full flex flex-col space-y-4">
              <div className="px-2 shrink-0">
                <h2 className="text-lg font-black text-gray-900 tracking-tight">
                  Transaction Entry
                </h2>
              </div>
              <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden shadow-blue-900/5 min-h-0">
                <OrderForm onSubmit={handleCreateOrder} />
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
        body {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
}
