// src/features/customers/customersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000';

export interface Customer {
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

interface CustomersState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  customers: [],
  loading: false,
  error: null,
};

// ─── Async thunks ───
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async () => {
    const res = await axios.get(`${API_BASE}/customers`);
    // Transform data to match frontend shape
    return res.data.map((c: any) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      totalOrders: 0,
      totalSpent: '$0',
      status: 'Active',
      joinedDate: c.registered_date,
    }));
  }
);

export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (data: any) => {
    const res = await axios.post(`${API_BASE}/customers`, data);
    return {
      ...data,
      id: res.data.id,                    // assuming backend returns new id
      totalOrders: 0,
      totalSpent: '$0',
      status: 'Active',
      joinedDate: new Date().toISOString(),
    };
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, data }: { id: number; data: any }) => {
    const res = await axios.put(`${API_BASE}/customers/${id}`, data);
    return { id, ...res.data };
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id: number) => {
    await axios.delete(`${API_BASE}/customers/${id}`);
    return id;
  }
);

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch customers';
      });

    // create
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.customers.push(action.payload);
    });

    // update
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      const index = state.customers.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = { ...state.customers[index], ...action.payload };
      }
    });

    // delete
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.filter((c) => c.id !== action.payload);
    });
  },
});

export default customersSlice.reducer;