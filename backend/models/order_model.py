from datetime import datetime

class Order:
    def __init__(
        self,
        order_id,
        customer_name,
        order_type: OrderType,
        payment_type: PaymentType,
        items: list[OrderItem]
    ):
        self.order_id = order_id
        self.customer_name = customer_name
        self.order_type = order_type
        self.payment_type = payment_type
        self.items = items

        self.status = OrderStatus.PENDING
        self.total_amount = self.calculate_total()
        self.created_at = datetime.now()

    def calculate_total(self):
        return sum(item.total_price() for item in self.items)

    def update_status(self, new_status: OrderStatus):
        self.status = new_status
