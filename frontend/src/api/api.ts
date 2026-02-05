const BASE_URL = 'http://127.0.0.1:5000';

export interface Order {
  order_id: string; 
  customer_name: string;
  order_type: string;
  payment_type: string;
  status: string;
  total_amount: number;
  created_at: string;
  items: any[];
}

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const res = await fetch(`${BASE_URL}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  } catch (error) {
    console.error('fetchOrders error:', error);
    return [];
  }
};

// --- AUTH API ---
export const loginUser = async (credentials: any) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
};

export const registerUser = async (userData: any) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Registration failed');
  }
  return res.json();
};

export const updateOrderStatus = async (id: number | string, status: string) => {
  await fetch(`${BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
};

export const deleteOrder = async (id: number | string) => {
  await fetch(`${BASE_URL}/orders/${id}`, { method: 'DELETE' });
};

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  quantity: number;
  supplier: any;
}

export const fetchItems = async (): Promise<InventoryItem[]> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/items'); 
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