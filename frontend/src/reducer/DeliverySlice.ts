import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000';

export interface Delivery {
  id: number;
  orderId?: string;           
  customerName?: string;
  delivery_status?: string;   
  assigned_driver?: string | null;
  [key: string]: any;
}

interface DeliveryState {
  deliveries: Delivery[];
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryState = {
  deliveries: [],
  loading: false,
  error: null,
};

export const fetchDeliveries = createAsyncThunk(
  'deliveries/fetchDeliveries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/deliveries`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch deliveries');
    }
  }
);

export const updateDelivery = createAsyncThunk(
  'deliveries/updateDelivery',
  async (
    { id, data }: { id: number; data: Partial<Delivery> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_BASE}/deliveries/order/${id}/update`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response.data; 
    } catch (err: any) {
      console.error('Update failed:', err);
      return rejectWithValue(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to update delivery'
      );
    }
  }
);

const deliverySlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action: PayloadAction<Delivery[]>) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load deliveries';
      });

    builder
      .addCase(updateDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDelivery.fulfilled, (state, action: PayloadAction<Delivery>) => {
        state.loading = false;
        const index = state.deliveries.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.deliveries[index] = {
            ...state.deliveries[index],
            ...action.payload,
          };
        }
      })
      .addCase(updateDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Update failed';
      });
  },
});

export default deliverySlice.reducer;