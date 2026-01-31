import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000';

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  supplied_items: string;
  price_per_unit: number;
  qty: number;
  status: string;
}

interface SupplierState {
  supplier: Supplier[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  supplier: [],
  loading: false,
  error: null,
};