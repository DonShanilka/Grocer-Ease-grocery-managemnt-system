import { useEffect, useState } from "react";
import SupplierTable from "./SupplierTable";
import SupplierForm from "./SupplierForm";
import SupplierView from "./SupplierView";
import SupplierHeader from "./SupplierHeader";
import { Supplier } from "@/src/types/Supplier";

const API_BASE_URL = "http://127.0.0.1:5000/suppliers";

export default function SupplierSection() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Supplier | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const load = async () => {
    const res = await fetch(API_BASE_URL);
    setSuppliers(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (data: any) => {
    const method = modal === "edit" ? "PUT" : "POST";
    const url =
      modal === "edit" ? `${API_BASE_URL}/${selected?.id}` : API_BASE_URL;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setModal(null);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete supplier?")) return;
    await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    load();
  };

  // Filter suppliers based on search and status
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.supplied_items?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || supplier.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="-mt-2 px-6">
      <SupplierHeader
        suppliers={suppliers}
        onAdd={() => setModal("add")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <SupplierTable
        suppliers={filteredSuppliers}
        onView={(s) => {
          setSelected(s);
          setModal("view");
        }}
        onEdit={(s) => {
          setSelected(s);
          setModal("edit");
        }}
        onDelete={remove}
      />

      {modal === "add" && (
        <SupplierForm onClose={() => setModal(null)} onSubmit={save} />
      )}
      {modal === "edit" && selected && (
        <SupplierForm
          supplier={selected}
          onClose={() => setModal(null)}
          onSubmit={save}
        />
      )}
      {modal === "view" && selected && (
        <SupplierView supplier={selected} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
