import { useState, useEffect } from 'react';

export default function CustomerModal({ mode, customer, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  useEffect(() => {
    if (customer) setFormData(customer);
  }, [customer]);

  if (mode === 'view') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-xl mb-4">{customer.name}</h2>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <p>{customer.address}</p>
          <button onClick={onClose} className="mt-4">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl mb-4">
          {mode === 'create' ? 'Add Customer' : 'Edit Customer'}
        </h2>

        {['name', 'email', 'phone', 'address'].map(field => (
          <input
            key={field}
            className="w-full border p-2 mb-2"
            placeholder={field}
            value={(formData as any)[field]}
            onChange={e => setFormData({ ...formData, [field]: e.target.value })}
          />
        ))}

        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 border p-2">Cancel</button>
          <button onClick={() => onSubmit(formData)} className="flex-1 bg-blue-600 text-white p-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
