import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "@/src/reducer/InventrySlice";
import customersReducer from '@/src/reducer/CustomersSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    customers: customersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
