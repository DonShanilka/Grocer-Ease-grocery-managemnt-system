import { useEffect, useState } from "react";
import SupplierTable from "./SupplierTable";
import SupplierForm from "./SupplierForm";
import SupplierView from "./SupplierView";
import { Supplier } from "@/src/types/Supplier";

const API_BASE_URL = "http://127.0.0.1:5000/suppliers";

export default function SupplierSection() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selected, setSelected] = useState<Supplier | null>(null);

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

  return (
    <div className="-mt-2 px-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-black ">Suppliers</h2>
        <button
          onClick={() => setModal("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Supplier
        </button>
      </div>

      <SupplierTable
        suppliers={suppliers}
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
