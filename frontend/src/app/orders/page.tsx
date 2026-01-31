"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderForm from "@/src/components/orders/OrderFormModal";
import { OrdersTable } from "../../components/orders/OrdersTable";
import { ViewOrderCard } from "../../components/orders/ViewOrderCard";

import { RootState, AppDispatch } from "@/src/store/store";
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
  
  return (
    <div>

    </div>
  )
}


