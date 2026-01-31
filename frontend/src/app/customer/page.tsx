'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomersHeader from '../../components/customers/CustomersHeader';
import CustomersTable from '../../components/customers/CustomersTable';
import CustomerModal from '../../components/customers/CustomerModal';

import { RootState, AppDispatch } from '@/src/store/Store';           
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '@/src/reducer/CustomersSlice';                  

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

  // Redux state
  const { customers, loading, error } = useSelector(
    (state: RootState) => state.customers
  );

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleEdit = (customer: Customer) => {
    setModalMode('edit');
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleView = (customer: Customer) => {
    setModalMode('view');
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this customer?')) return;
    dispatch(deleteCustomer(id));
  };

  const handleSubmit = (formData: any) => {
    if (modalMode === 'create') {
      dispatch(createCustomer(formData));
    } else if (modalMode === 'edit' && selectedCustomer) {
      dispatch(
        updateCustomer({
          id: selectedCustomer.id,
          data: formData,
        })
      );
    }
    setShowModal(false);
  };

  const filteredCustomers = customers.filter((c: Customer) => {
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
    </div>
  );
}
