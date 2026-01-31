import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api = "http://127.0.0.1:5000";

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  supplier: string;
  status: string;
  added_date: string;
}

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  selectedItem: InventoryItem | null;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  selectedItem: null,
};

export const fetchItems = createAsyncThunk(
  "inventory/fetchItems",
  async () => {
    const res = await fetch(`${api}/items`);
    return res.json();
  }
);

export const addItem = createAsyncThunk(
  "inventory/addItem",
  async (data: Partial<InventoryItem>) => {
    await fetch(`${api}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
);

export const updateItem = createAsyncThunk(
  "inventory/updateItem",
  async ({ id, data }: { id: number; data: Partial<InventoryItem> }) => {
    await fetch(`${api}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
);

export const deleteItem = createAsyncThunk(
  "inventory/deleteItem",
  async (id: number) => {
    await fetch(`${api}/items/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { setSelectedItem } = inventorySlice.actions;
export default inventorySlice.reducer;