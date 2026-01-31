import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api = "http://127.0.0.1:5000";

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  supplier: string;
  status: string;
  added_date: string;
}

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  selectedItem: InventoryItem | null;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  selectedItem: null,
};

export const fetchItems = createAsyncThunk(
  "inventory/fetchItems",
  async () => {
    const res = await fetch(`${api}/items`);
    return res.json();
  }
);

export const addItem = createAsyncThunk(
  "inventory/addItem",
  async (data: Partial<InventoryItem>) => {
    await fetch(`${api}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
);

export const updateItem = createAsyncThunk(
  "inventory/updateItem",
  async ({ id, data }: { id: number; data: Partial<InventoryItem> }) => {
    await fetch(`${api}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
);

export const deleteItem = createAsyncThunk(
  "inventory/deleteItem",
  async (id: number) => {
    await fetch(`${api}/items/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { setSelectedItem } = inventorySlice.actions;
export default inventorySlice.reducer;



"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderForm from "@/src/components/orders/OrderFormModal";
import { OrdersTable } from "../../components/orders/OrdersTable";
import { ViewOrderCard } from "../../components/orders/ViewOrderCard";

import { RootState, AppDispatch } from "@/src/store/store";
import { fetchOrders, createOrder, deleteOrder } from "@/src/features/orders/ordersSlice";
import type { Order } from "@/src/features/orders/ordersSlice";

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  // Local UI state
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  // Load orders when component mounts
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // ────────────────────────────────────────────────
  // Extracted submit handler (using useCallback for stability)
  // ────────────────────────────────────────────────
  const handleCreateOrder = useCallback(
    async (formData: any) => {
      try {
        await dispatch(createOrder(formData)).unwrap();
        alert("Order created successfully!");
        // No manual reload needed — the slice already adds the new order
      } catch (err: any) {
        console.error("Order creation failed:", err);
        const errorMessage = err.message || "Could not create order";
        alert(`Error: ${errorMessage}`);
      }
    },
    [dispatch] // dependencies — re-create only if dispatch changes (almost never)
  );

  // ────────────────────────────────────────────────
  // Delete handler (also extracted for clarity)
  // ────────────────────────────────────────────────
  const handleDeleteOrder = useCallback(
    (id: number) => {
      if (window.confirm("Are you sure you want to delete this order?")) {
        dispatch(deleteOrder(id));
      }
    },
    [dispatch]
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* === Create Order Section === */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Create New Order
          </h2>

          <OrderForm onSubmit={handleCreateOrder} />
        </div>

        {/* === Orders Table Section === */}
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
              orders={orders}
              onView={(order) => setViewOrder(order)}
              onDelete={handleDeleteOrder}
              // onEdit={(order) => ... } ← add later when needed
            />
          )}
        </div>
      </div>

      {/* === View Order Modal === */}
      {viewOrder && (
        <ViewOrderCard
          order={viewOrder}
          onClose={() => setViewOrder(null)}
        />
      )}
    </div>
  );
}