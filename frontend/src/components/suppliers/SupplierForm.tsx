import { useState } from "react";
import { X } from "lucide-react";
import { Supplier } from "@/src/types/Supplier";

interface Props {
  supplier?: Supplier;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function SupplierForm({ supplier, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    name: supplier?.name || "",
    phone: supplier?.phone || "",
    email: supplier?.email || "",
    address: supplier?.address || "",
    supplied_items: supplier?.supplied_items || "",
    price_per_unit: supplier?.price_per_unit || "",
    qty: supplier?.qty || "",
    status: supplier?.status || "Active",
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">{supplier ? "Edit Supplier" : "Add Supplier"}</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            placeholder={key.replace("_", " ").toUpperCase()}
            value={value as any}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
        ))}

        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 border rounded py-2">Cancel</button>
          <button onClick={() => onSubmit(form)} className="flex-1 bg-blue-600 text-white rounded py-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
