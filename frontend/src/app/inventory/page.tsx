"use client";
import { useState, useEffect } from "react";
import { InventoryItem } from "../../types/Items";
import { InventoryHeader } from "../../components/Inventory/InventoryHeader";
import { StatsCards } from "../../components/Inventory/StatsCards";
import { InventoryTable } from "../../components/Inventory/InventoryTable";
import { ViewCard } from "../../components/Inventory/ViewCard";
import { ItemForm } from "../../components/Inventory/ItemForm";
import { CategoryPieChart } from "@/src/components/Inventory/CategoryPieChart";
import SupplierSection from "@/src/components/suppliers/ SupplierSection";

const API_BASE_URL = "http://127.0.0.1:5000";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/items`);
      const data = await res.json();
      setInventory(data);
    } catch {
      setInventory([
        {
          id: 1,
          name: "Apples",
          category: "Fresh Produce",
          price: 2.99,
          quantity: 50,
          unit: "kg",
          description: "Fresh red apples",
          supplier: "Fresh Farms",
          status: "Low Stock",
          added_date: "2024-01-15",
        },
        {
          id: 2,
          name: "Milk",
          category: "Dairy Products",
          price: 3.49,
          quantity: 20,
          unit: "liters",
          description: "Whole milk",
          supplier: "Dairy Delights",
          status: "Reorder Needed",
          added_date: "2024-01-10",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddNew = () => {
    setModalMode("create");
    setSelectedItem(null);
    setShowModal(true);
  };
  const handleEdit = (item: InventoryItem) => {
    setModalMode("edit");
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleView = (item: InventoryItem) => {
    setModalMode("view");
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`${API_BASE_URL}/items/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };
  const handleFormSubmit = async (data: any) => {
    try {
      if (modalMode === "create")
        await fetch(`${API_BASE_URL}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      else if (modalMode === "edit" && selectedItem)
        await fetch(`${API_BASE_URL}/items/${selectedItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      fetchItems();
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredInventory = inventory.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <InventoryHeader
        onAddNew={handleAddNew}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <StatsCards inventory={inventory} />

      <div className="flex flex-col lg:flex-row gap-6 px-6">
        {loading ? (
        <p className="px-6">Loading...</p>
      ) : (
        <InventoryTable
          items={filteredInventory}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <CategoryPieChart inventory={inventory} />
      </div>

      {showModal && modalMode === "view" && selectedItem && (
        <ViewCard item={selectedItem} onClose={() => setShowModal(false)} />
      )}
      {showModal && (modalMode === "create" || modalMode === "edit") && (
        <ItemForm
          mode={modalMode}
          item={selectedItem || undefined}
          onClose={() => setShowModal(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      <SupplierSection />
      
    </div>
  );
}
