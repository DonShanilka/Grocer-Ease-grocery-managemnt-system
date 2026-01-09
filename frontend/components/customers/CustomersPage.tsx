'use client';

import { useEffect, useState } from 'react';
import CustomersHeader from './CustomersHeader';
import CustomersTable from './CustomersTable';
import CustomerModal from './CustomerModal';

const API_BASE = 'http://localhost:5000';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  /* ---------- FETCH ---------- */
  const fetchCustomers = async () => {
    const res = await fetch(`${API_BASE}/customers`);
    const data = await res.json();

    setCustomers(
      data.map((c: any) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        address: c.address,
        totalOrders: 0,
        totalSpent: '$0',
        status: 'Active',
        joinedDate: c.registered_date
      }))
    );
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ---------- ACTIONS ---------- */
  const handleCreate = () => {
    setModalMode('create');
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleEdit = (customer: any) => {
    setModalMode('edit');
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleView = (customer: any) => {
    setModalMode('view');
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this customer?')) return;
    await fetch(`${API_BASE}/customers/${id}`, { method: 'DELETE' });
    fetchCustomers();
  };

  const handleSubmit = async (formData: any) => {
    if (modalMode === 'create') {
      await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch(`${API_BASE}/customers/${selectedCustomer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }

    setShowModal(false);
    fetchCustomers();
  };

  const filteredCustomers = customers.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <CustomersHeader
        customers={customers}
        onAdd={handleCreate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <CustomersTable
        customers={filteredCustomers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <CustomerModal
          mode={modalMode}
          customer={selectedCustomer}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
