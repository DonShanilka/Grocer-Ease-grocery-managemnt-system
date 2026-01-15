"use client";
import React, { useEffect, useState } from "react";
import Header from "@/src/components/delivery/DeliveryHeader";
import StatsCard, {
  DeliveryStats,
} from "@/src/components/delivery/DeliveryStatsCard";
import ShipmentChart from "@/src/components/delivery/DeliveryShipmentChart";
import LiveTracking from "@/src/components/delivery/LiveTracking";
import RevenueCard from "@/src/components/delivery/RevenueCard";
import { Calendar, Download, ChevronDown } from "lucide-react";
import { Delivery } from "../../types/Delivery";
import { ShipmentsTable } from "@/src/components/delivery/ShipmentsTable";
import { DeliveryViewCard } from "@/src/components/delivery/DeliveryViewCard";

const apiUrl = "http://127.0.0.1:5000";

function DeliveryPage() {
  const [timeFilter, setTimeFilter] = useState("This Month");
  const [delivery, setDelivery] = useState<Delivery[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");

  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/deliveries`);
      const data = await res.json();
      setDelivery(data);
    } catch (error) {
      console.error("Error fetching delivery status:", error);
    } finally {
      setLoading(false);
      console.log("Fetch delivery status attempt finished.");
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

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

  const handleFormSubmit = async () => {
    try {
      if (modalMode === "edit" && selectedDelivery) {
        await fetch(`${apiUrl}/deliveries/${selectedDelivery.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedDelivery),
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setShowModal(false);
      fetchDeliveries();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <StatsCard delivery={delivery} />

          {/* Shipment chart & Live tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ShipmentChart />

            {loading ? (
              <p>Loading ....</p>
            ) : (
              <ShipmentsTable
                shipments={delivery}
                onView={handleView}
                onEdit={handleEdit}
              />
            )}
          </div>

          {/* Shipments Table & Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <LiveTracking />
            </div>
            <RevenueCard />
          </div>
        </div>

        {showModal && modalMode === "view" && selectedDelivery && (
          <DeliveryViewCard
            delivery={selectedDelivery}
            onClose={() => setShowModal(false)}
          />
        )}
      </main>
    </div>
  );
}

export default DeliveryPage;
