"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomersHeader from "../../components/customers/CustomersHeader";
import CustomersTable from "../../components/customers/CustomersTable";
import CustomerModal from "../../components/customers/CustomerModal";
import Toast from "../../components/common/Toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import { RootState, AppDispatch } from "@/src/store/Store";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/src/reducer/CustomersSlice";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: string;
  status: string;
  joinedDate: string;
}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  const { customers, loading, error } = useSelector(
    (state: RootState) => state.customers,
  );

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create",
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleCreate = () => {
    setModalMode("create");
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleEdit = (customer: Customer) => {
    setModalMode("edit");
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleView = (customer: Customer) => {
    setModalMode("view");
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    const customer = customers.find((c: Customer) => c.id === id);
    if (customer) {
      setDeleteConfirm({ id, name: customer.name });
    }
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    dispatch(deleteCustomer(deleteConfirm.id))
      .unwrap()
      .then(() => {
        setToast({
          message: "Customer deleted successfully!",
          type: "success",
        });
        setDeleteConfirm(null);
      })
      .catch(() => {
        setToast({
          message: "Failed to delete customer. Please try again.",
          type: "error",
        });
        setDeleteConfirm(null);
      });
  };

  const handleSubmit = (formData: any) => {
    if (modalMode === "create") {
      dispatch(createCustomer(formData))
        .unwrap()
        .then(() => {
          setToast({
            message: "Customer created successfully!",
            type: "success",
          });
          setShowModal(false);
        })
        .catch(() => {
          setToast({
            message: "Failed to create customer. Please try again.",
            type: "error",
          });
        });
    } else if (modalMode === "edit" && selectedCustomer) {
      if (!selectedCustomer.id) {
        setToast({
          message: "Error: Customer ID missing. Please refresh the page.",
          type: "error",
        });
        return;
      }

      dispatch(
        updateCustomer({
          id: selectedCustomer.id,
          data: formData,
        }),
      )
        .unwrap()
        .then(() => {
          setToast({
            message: "Customer updated successfully!",
            type: "success",
          });
          setShowModal(false);
          dispatch(fetchCustomers());
        })
        .catch(() => {
          setToast({
            message: "Failed to update customer. Please try again.",
            type: "error",
          });
        });
    }
  };

  const filteredCustomers = customers.filter((c: Customer) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    const matchStatus = filterStatus === "all" || c.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CustomersHeader
        customers={customers}
        onAdd={handleCreate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {loading ? (
        <div className="p-6 text-center">Loading customers...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-600">Error: {error}</div>
      ) : (
        <CustomersTable
          customers={filteredCustomers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <CustomerModal
          mode={modalMode}
          customer={selectedCustomer}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Customer"
          message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
