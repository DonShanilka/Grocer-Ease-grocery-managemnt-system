import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000';

export interface Order {
  id: number;
  order_number?: string;          
  customer_id?: number;
  customer_name?: string;
  total_amount?: number | string;
  status: 
    | 'pending' 
    | 'confirmed' 
    | 'processing' 
    | 'shipped' 
    | 'in-transit' 
    | 'delivered' 
    | 'cancelled' 
    | 'returned' 
    | string;
  order_date?: string;
  delivery_address?: string;
  payment_method?: string;
  payment_status?: 'paid' | 'pending' | 'failed' | string;
  items?:Array<{product_id: number;
    name: string;
    quantity: number;
    price: number;}> ;
  [key: string]: any; 
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};


export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_BASE}/orders`);
            return response.data;
        } catch (err : any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to fetch orders'
            )
        }
    }
)

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: Partial<Order>, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_BASE}/orders`, orderData, {
                headers: {'Content-Type': 'application/json'},
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Failed to create order'
            )
        }
    }
)

export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (id: number, {rejectWithValue}) => {
        try {
            await axios.delete(`${API_BASE}/orders/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue (
                err.response?.data?.message || 'Failed to delete order'
            )
        }
    }
)

export const updateOrder = createAsyncThunk(
    'orders/updateOrder',
    async ({ id, status }: { id: number; status: string }, { rejectWithValue }) => {
        try {
            await axios.put(`${API_BASE}/orders/${id}/status`, { status });
            return { id, status };
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to update order'
            );
        }
    }
);


const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load orders';
      });

    
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.unshift(action.payload); 
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Order creation failed';
      });

    
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Delete failed';
      });

    // update
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<{ id: number; status: string }>) => {
        state.loading = false;
        const order = state.orders.find((o) => o.id === action.payload.id);
        if (order) {
          order.status = action.payload.status;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Update failed';
      });
  },
});

export default ordersSlice.reducer;