import { Supplier } from "@/src/types/Supplier";
import { X } from "lucide-react";

export default function SupplierView({ supplier, onClose }: { supplier: Supplier; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Supplier Details</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {Object.entries(supplier).map(([k, v]) => (
          <p key={k} className="text-sm mb-2">
            <span className="font-medium">{k.replace("_", " ")}:</span> {v}
          </p>
        ))}
      </div>
    </div>
  );
}