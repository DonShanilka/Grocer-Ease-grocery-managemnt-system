export interface OrderItem {
  item_id: number;
  item_name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  customer_name: string;
  order_type: "TAKEAWAY" | "DELIVERY";
  payment_type: "CASH" | "CARD";
  status: string;
  total_amount: number;
  created_at: string;
}

