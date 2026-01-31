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