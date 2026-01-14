export const ORDER_TYPES = ["TAKEAWAY", "DELIVERY"] as const;
export const PAYMENT_TYPES = ["CASH", "CARD"] as const;
export const ORDER_STATUS = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "COMPLETED",
  "CANCELLED",
] as const;