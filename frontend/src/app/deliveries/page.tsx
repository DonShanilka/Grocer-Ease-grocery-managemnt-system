"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "@/src/components/delivery/DeliveryHeader";
import StatsCard from "@/src/components/delivery/DeliveryStatsCard";
import ShipmentChart from "@/src/components/delivery/DeliveryShipmentChart";
import LiveTracking from "@/src/components/delivery/LiveTracking";
import RevenueCard from "@/src/components/delivery/RevenueCard";
import { ShipmentsTable } from "@/src/components/delivery/ShipmentsTable";
import { DeliveryViewCard } from "@/src/components/delivery/DeliveryViewCard";

import { RootState, AppDispatch } from "@/src/store/Store";
import { fetchDeliveries, updateDelivery } from "@/src/reducer/DeliverySlice";
import type { Delivery } from "@/src/types/Delivery";
import { DeliveryEditModal } from "@/src/components/delivery/DeliveryEditModal";

export default function DeliveryPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { deliveries, loading, error } = useSelector(
    (state: RootState) => state.deliveries
  );

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );

  // const [timeFilter, setTimeFilter] = useState("This Month");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const handleFormSubmit = (updatedData: Partial<Delivery>) => {
    if (modalMode === "edit" && selectedDelivery) {
      setIsSubmitting(true);
      dispatch(
        updateDelivery({
          id: selectedDelivery.id,
          data: updatedData,
        })
      )
        .unwrap()
        .then(() => {
          setShowModal(false);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const handleEdit = (delivery: Delivery) => {
    setModalMode("edit");
    setSelectedDelivery(delivery);
    setShowModal(true);
  };

  const handleView = (delivery: Delivery) => {
    setModalMode("view");
    setSelectedDelivery(delivery);
    setShowModal(true);
  };

  const filteredDeliveries = deliveries.filter((d: any) =>
    `${d.customerName || ""} ${d.status || ""} ${d.trackingNumber || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* <Header /> */}

      <main>
        <div>
          <StatsCard delivery={deliveries as any} />

          {/* Shipment chart & Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RevenueCard/>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-lg font-medium">Loading deliveries...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64 text-red-600">
                <p>Error: {error}</p>
              </div>
            ) : (
              <ShipmentsTable
                shipments={filteredDeliveries as any}
                onView={handleView}
                onEdit={handleEdit}
              />
            )}
          </div>

          {/* Live Tracking & Revenue */}
          <div className="gap-4">
            <ShipmentChart />
          </div>
        </div>
      </main>

      {showModal && selectedDelivery && (
        <>
          {modalMode === "view" && (
            <DeliveryViewCard
              delivery={selectedDelivery}
              onClose={() => setShowModal(false)}
            />
          )}

          {modalMode === "edit" && (
            <DeliveryEditModal
              delivery={selectedDelivery}
              onSubmit={handleFormSubmit}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
