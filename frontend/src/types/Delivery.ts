export interface Delivery {
  id: number;
  order_id: number;
  delivery_address: string | null;
  contact_phone: string | null;
  delivery_status: "PENDING" | "OUT_FOR_DELIVERY" | "COMPLETED" | "CANCELLED";
  assigned_driver: string | null;
}