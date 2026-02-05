"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, ChevronRight, Package, Clock, CheckCircle2, Search } from "lucide-react";

import OrderForm from "@/src/components/orders/OrderFormModal";
import { OrdersTable } from "../../components/orders/OrdersTable";
import OrdersHeader from "../../components/orders/OrdersHeader";
import { ViewOrderCard } from "../../components/orders/ViewOrderCard";
import { UpdateStatusModal } from "../../components/orders/UpdateStatusModal";
import Toast from "@/src/components/common/Toast";

import { RootState, AppDispatch } from "@/src/store/Store";
import { fetchOrders, createOrder, deleteOrder, updateOrder } from "@/src/reducer/OrderSlice";
import type { Order } from "@/src/types/Order";

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [updateOrderModal, setUpdateOrderModal] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" | "info" } | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id?.toString().includes(searchQuery);

    const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === "all" || order.order_type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateOrder = useCallback(
    async (formData: any) => {
      try {
        await dispatch(createOrder(formData)).unwrap();
        setToast({ message: "Transaction completed successfully!", type: "success" });
        setShowCreateModal(false);
      } catch (err: any) {
        console.error("Operation failed: ", err);
        const errorMessage = err.message || "Failed to process transaction";
        setToast({ message: `Error: ${errorMessage}`, type: "error" });
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

  const handleEditOrder = (order: Order) => {
    setUpdateOrderModal(order);
  };

  const handleUpdateStatus = useCallback(
    async (status: string) => {
      if (!updateOrderModal) return;

      try {
        await dispatch(updateOrder({ id: updateOrderModal.id, status })).unwrap();
        setToast({ message: "Order status updated successfully!", type: "success" });
        setUpdateOrderModal(null);
      } catch (err: any) {
        console.error("Update failed:", err);
        setToast({ message: "Failed to update order. Please try again.", type: "error" });
      }
    },
    [dispatch, updateOrderModal]
  );

  return (
    <div className="h-screen bg-gray-50 p-6 font-[Outfit, sans-serif] flex flex-col overflow-hidden">
      <div className="shrink-0 space-y-6 mb-6">
        <OrdersHeader
          orders={orders}
          onAdd={() => setShowCreateModal(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterType={filterType}
          setFilterType={setFilterType}
        />
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Loading orders...
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-600">
            Error: {error}
          </div>
        ) : (
          <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
            <OrdersTable
              orders={filteredOrders}
              onView={setViewOrder}
              onEdit={handleEditOrder}
              onDelete={handleDeleteOrder}
            />
          </div>
        )}
      </div>

      {/* Create Order Modal (Full Screen Overlay) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-white z-[100] animate-in slide-in-from-bottom duration-300 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <h2 className="text-xl font-black text-gray-900">New Transaction</h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <OrderForm onSubmit={handleCreateOrder} />
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewOrder && (
        <ViewOrderCard
          order={viewOrder}
          onClose={() => setViewOrder(null)}
        />
      )}

      {/* Update Status Modal */}
      {updateOrderModal && (
        <UpdateStatusModal
          order={updateOrderModal}
          onSave={handleUpdateStatus}
          onClose={() => setUpdateOrderModal(null)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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