import { Supplier } from "@/src/types/Supplier";
import { X, User, Phone, Mail, MapPin, Package, Hash, DollarSign, CheckCircle, Info } from "lucide-react";

export default function SupplierView({ supplier, onClose }: { supplier: Supplier; onClose: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "active": return "bg-green-100 text-green-700";
      case "Inactive": return "bg-gray-100 text-gray-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "S";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header with Background Gradient */}
        <div className="relative h-24 bg-gradient-to-r from-blue-700 to-blue-900 px-6 flex items-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-red-500 rounded-full transition-all text-white hover:scale-110"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="absolute -bottom-10 left-6 flex items-end gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-blue-800 font-bold text-2xl">
              {getInitials(supplier.name)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{supplier.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(supplier.status)}`}>
                  {supplier.status}
                </span>
                <span className="text-gray-400 text-xs">• ID: #{supplier.id}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact Information Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info size={14} /> Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Phone Number</p>
                    <p className="text-sm font-medium text-gray-800">{supplier.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Email Address</p>
                    <p className="text-sm font-medium text-gray-800">{supplier.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-md">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Address</p>
                    <p className="text-sm font-medium text-gray-800">{supplier.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Details Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Package size={14} /> Supply Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Items Provided</p>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <Package size={14} className="text-blue-600" />
                    {supplier.supplied_items}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Stock Quantity</p>
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <Hash size={14} className="text-green-600" />
                    {supplier.qty} Units
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-200">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Price Per Unit</p>
                  <div className="flex items-center gap-2 text-lg font-bold text-blue-800">
                    <DollarSign size={18} />
                    Rs. {parseFloat(supplier.price_per_unit || "0").toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-bold shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}