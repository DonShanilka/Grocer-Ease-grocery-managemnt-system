"use client";

import { useState, useEffect } from "react";
import { OrdersTable } from "@/src/components/orders/OrdersTable";
import { Order } from "@/src/types/Order";
import {
  ShoppingCart,
  Trash2,
  Plus,
  User,
  CreditCard,
  Package,
  History,
  Store,
  Wallet,
  MoreVertical,
} from "lucide-react";
import { UpdateStatusModal } from "./UpdateStatusModal";
import Toast from "../common/Toast";

interface OrderItem {
  product_id: number;
  item_name: string;
  quantity: number;
  price: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  onSubmit: (data: any) => void;
}

export default function OrderForm({ onSubmit }: Props) {
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState("DELIVERY");
  const [paymentType, setPaymentType] = useState("CASH");
  const [showTable, setShowTable] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" | "info" } | null>(null);

  const [items, setItems] = useState<OrderItem[]>([
    { product_id: 0, item_name: "", quantity: 1, price: 0 },
  ]);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (showTable) {
      fetch("http://127.0.0.1:5000/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Failed to load orders", err));
    }
  }, [showTable]);

  const addItem = () => {
    setItems([
      ...items,
      { product_id: 0, item_name: "", quantity: 1, price: 0 },
    ]);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/items")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "product_id") {
      const product = products.find((p) => p.id === Number(value));

      if (product) {
        updated[index].item_name = product.name;
        updated[index].price = product.price;
      } else {
        updated[index].item_name = "";
        updated[index].price = 0;
      }
    }

    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.length > 1 ? items.filter((_, i) => i !== index) : items);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!editingOrder) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/orders/${editingOrder.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Update failed");

      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? { ...o, status } : o))
      );
      setToast({ message: "Archive record updated successfully", type: "success" });
      setEditingOrder(null);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to update record", type: "error" });
    }
  };

  const handleSubmit = () => {
    if (!customerName || items.length === 0) {
      alert("Customer name and items are required");
      return;
    }

    if (items.some((i) => i.product_id === 0)) {
      alert("Invalid product ID");
      return;
    }

    onSubmit({
      customer_name: customerName,
      order_type: orderType,
      payment_type: paymentType,
      items: items.map((i) => ({
        product_id: Number(i.product_id),
        item_name: i.item_name,
        quantity: Number(i.quantity),
        price: Number(i.price),
      })),
    });

    // Clear all form fields after successful order placement
    setCustomerName("");
    setOrderType("DELIVERY");
    setPaymentType("CASH");
    setItems([{ product_id: 0, item_name: "", quantity: 1, price: 0 }]);
  };

  const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* LEFT SIDE: Entry Fields - Occupies 65% on desktop */}
        <div className="flex-[0.65] flex flex-col border-r border-gray-100 overflow-hidden">
          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
            {/* Customer Details section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <User className="w-5 h-5 text-blue-700" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Customer Information</h2>
              </div>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Search or enter customer name..."
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-700 focus:bg-white rounded-2xl transition-all outline-none font-bold text-gray-900"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Distribution Method</label>
                    <div className="relative">
                      <select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-700 focus:bg-white rounded-2xl transition-all outline-none font-bold text-gray-900 appearance-none cursor-pointer"
                      >
                        <option value="DINE_IN">Dining In</option>
                        <option value="TAKE_AWAY">Take Away</option>
                        <option value="DELIVERY">Direct Delivery</option>
                      </select>
                      <MoreVertical className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Settlement Method</label>
                    <div className="relative">
                      <select
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-700 focus:bg-white rounded-2xl transition-all outline-none font-bold text-gray-900 appearance-none cursor-pointer"
                      >
                        <option value="CASH">Cash Settlement</option>
                        <option value="CARD">Digital Card</option>
                        <option value="ONLINE">Transfer / Wallet</option>
                      </select>
                      <MoreVertical className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl">
                    <ShoppingCart className="w-5 h-5 text-blue-700" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Basket Items</h2>
                </div>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-bold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Row
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="group relative grid grid-cols-12 gap-4 items-end bg-white border border-gray-100 p-6 rounded-3xl transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5">
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SKU ID</label>
                      <input
                        type="number"
                        value={item.product_id || ""}
                        onChange={(e) => updateItem(index, "product_id", Number(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none font-bold text-gray-900 focus:bg-blue-50/50 transition-colors"
                        placeholder="000"
                      />
                    </div>
                    <div className="col-span-4 space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Desc</label>
                      <input
                        type="text"
                        value={item.item_name}
                        onChange={(e) => updateItem(index, "item_name", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none font-bold text-gray-900 focus:bg-blue-50/50 transition-colors"
                        placeholder="Inventory name"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none font-bold text-gray-900 focus:bg-blue-50/50 transition-colors"
                      />
                    </div>
                    <div className="col-span-3 space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rs.</span>
                        <input
                          type="number"
                          value={item.price || ""}
                          onChange={(e) => updateItem(index, "price", Number(e.target.value))}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none font-bold text-gray-900 focus:bg-blue-50/50 transition-colors"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center pb-1">
                      <button
                        onClick={() => removeItem(index)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Footer within Left Column */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
            <button
              onClick={() => setShowTable(true)}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-bold text-sm transition-colors group"
            >
              <History className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Access Archive Records
            </button>
            <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
              Draft System Ver 4.0.2
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Summary Panel - Occupies 35% on desktop */}
        <div className="flex-[0.35] flex flex-col bg-gray-50/50">
          <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-700 rounded-xl shadow-lg shadow-blue-200">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Receipt</h2>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/[0.02] p-8 space-y-8">
              {/* Header Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry Agent</div>
                  <div className="text-sm font-bold text-gray-900">Nishith S.</div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol</div>
                  <div className="text-sm font-bold text-blue-700 uppercase">{orderType.replace("_", " ")}</div>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Items List in Summary */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                  <span>Line Item</span>
                  <span>Extended</span>
                </div>
                <div className="space-y-3">
                  {items.filter(i => i.item_name).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 leading-none">{item.item_name}</span>
                        <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">Rs. {item.quantity * item.price}</span>
                    </div>
                  ))}
                  {items.filter(i => i.item_name).length === 0 && (
                    <div className="text-center py-6 text-gray-300 font-bold text-sm italic">Pending Inventory Entry...</div>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              {/* Totals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-500">Gross Total</span>
                  <span className="text-sm font-bold text-gray-500">Rs. {total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-cyan-600">Tax Relief (0%)</span>
                  <span className="text-sm font-bold text-cyan-600">Rs. 0.00</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 leading-none">Net Payable</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Settlement required</span>
                  </div>
                  <div className="text-3xl font-black text-blue-700 tracking-tighter leading-none">Rs. {total}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50/50 p-6 rounded-3xl border border-blue-50/50">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-700 shadow-sm">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Active Wallet</div>
                <div className="text-sm font-bold text-gray-900">Corporate Terminal #09</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-8 mt-auto">
            <button
              onClick={handleSubmit}
              className="group relative w-full h-14 overflow-hidden bg-blue-700 text-white rounded-[2rem]  transition-all hover:bg-blue-800 active:scale-[0.98] shadow-2xl shadow-blue-700/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="relative flex items-center justify-center gap-4">
                <span className="text-lg font-black tracking-widest uppercase">Validate & Seal Transaction</span>
                <Package className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL / ARCHIVE VIEW */}
      {showTable && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-10 animate-in fade-in zoom-in duration-300">
          <div className="bg-white w-full max-w-6xl rounded-[4rem] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col h-[85vh]">
            <div className="p-10 border-b border-gray-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900 rounded-2xl">
                  <History className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">Archive Ledger</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Verified Transaction History</p>
                </div>
              </div>
              <button
                onClick={() => setShowTable(false)}
                className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              <OrdersTable
                orders={orders}
                onView={(o) => console.log("view", o)} // View logic unimplemented for now as per user request scope
                onEdit={setEditingOrder}
                onDelete={async (id) => {
                  if (confirm("Permanently wipe this record?")) {
                    await fetch(`http://127.0.0.1:5000/orders/${id}`, { method: "DELETE" });
                    setOrders((prev) => prev.filter((o) => o.id !== id));
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modals & Toasts */}
      {editingOrder && (
        <UpdateStatusModal
          order={editingOrder}
          onSave={handleUpdateStatus}
          onClose={() => setEditingOrder(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
