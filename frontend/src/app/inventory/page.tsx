"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InventoryItem } from "../../types/Items";
import { InventoryHeader } from "../../components/Inventory/InventoryHeader";
import { StatsCards } from "../../components/Inventory/StatsCards";
import { InventoryTable } from "../../components/Inventory/InventoryTable";
import { ViewCard } from "../../components/Inventory/ViewCard";
import { ItemForm } from "../../components/Inventory/ItemForm";
import { CategoryPieChart } from "@/src/components/Inventory/CategoryPieChart";
import SupplierSection from "@/src/components/suppliers/ SupplierSection";

import { RootState, AppDispatch } from "@/src/store/Store";
import {
  fetchItems,
  deleteItem,
  addItem,
  updateItem,
} from "@/src/reducer/InventrySlice";

export default function InventoryPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading } = useSelector((state: RootState) => state.inventory);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

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

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure?")) return;
    dispatch(deleteItem(id));
  };

  const handleFormSubmit = (data: any) => {
    if (modalMode === "create") {
      dispatch(addItem(data));
    } else if (modalMode === "edit" && selectedItem) {
      dispatch(updateItem({ id: selectedItem.id, data }));
    }
    setShowModal(false);
  };

  // Search filter
  const filteredInventory = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <InventoryHeader
        onAddNew={handleAddNew}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Stats */}
      <StatsCards inventory={items} />

      {/* Table + Chart */}
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

        <CategoryPieChart inventory={items} />
      </div>

      {/* Modals */}
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

      {/* Suppliers */}
      <SupplierSection />
    </div>
  );
}
