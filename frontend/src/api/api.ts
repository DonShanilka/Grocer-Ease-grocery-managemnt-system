const BASE_URL = 'http://127.0.0.1:5000';

export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  return res.json();
};

export const updateOrderStatus = async (id: number, status: string) => {
  await fetch(`${BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
};

export const deleteOrder = async (id: number) => {
  await fetch(`${BASE_URL}/orders/${id}`, { method: 'DELETE' });
};


export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
}

export const fetchItems = async (): Promise<InventoryItem[]> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/inventory'); // your backend endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch inventory items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchItems error:', error);
    return [];
  }
};