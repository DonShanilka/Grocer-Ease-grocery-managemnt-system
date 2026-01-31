import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "@/src/reducer/InventrySlice";
import customersReducer from '@/src/reducer/CustomersSlice';
import deliveriesReducer from '@/src/reducer/DeliverySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    customers: customersReducer,
    deliveries: deliveriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
