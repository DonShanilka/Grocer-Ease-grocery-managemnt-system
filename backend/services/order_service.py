from repositories.order_repository import OrderRepository
from repositories.order_item_repository import OrderItemRepository
from repositories.delivery_repository import DeliveryRepository

from models.order_model import Order
from models.delivery_model import Delivery
from enums.order_enums import OrderType, OrderStatus, PaymentType
from models.orderItem_model import OrderItem  



class OrderService:

    @staticmethod
    def create_order(data):
        """
        Create order + items
        Create delivery ONLY if order_type = DELIVERY
        """

        # -------- Validation --------
        if not data.get("customer_name"):
            raise ValueError("Customer name is required")

        if not data.get("items") or len(data["items"]) == 0:
            raise ValueError("Order items are required")

        # Convert dicts to OrderItem objects
        items = []
        for i in data["items"]:
            item = OrderItem(
                item_id=i.get("item_id"),
                name=i["item_name"],
                price=i["price"],
                quantity=i["quantity"]
            )
            items.append(item)

        # -------- Create Order Object --------
        order = Order(
            order_id=None,
            customer_name=data["customer_name"],
            order_type=OrderType(data["order_type"]),
            payment_type=PaymentType(data["payment_type"]),
            items=items
        )

        # -------- Save Order --------
        order_id = OrderRepository.save(order)

        # -------- Save Order Items --------
        for item in items:
            OrderItemRepository.save(order_id, item)

        # -------- Create Delivery (Only if DELIVERY) --------
        if order.order_type == OrderType.DELIVERY:
            delivery = Delivery(
                order_id=order_id,
                delivery_address=data.get("delivery_address"),
                contact_phone=data.get("contact_phone"),
                delivery_status="PENDING",
                assigned_driver=None
            )
            DeliveryRepository.save(delivery)

        return order_id
    

    @staticmethod
    def get_orders():
        return OrderRepository.find_all()

    @staticmethod
    def get_order_by_id(order_id):
        order = OrderRepository.find_by_id(order_id)
        if not order:
            raise ValueError("Order not found")

        items = OrderItemRepository.find_by_order(order_id)
        delivery = DeliveryRepository.find_by_order(order_id)

        return {
            "order": order,
            "items": items,
            "delivery": delivery
        }

    @staticmethod
    def update_order_status(order_id, status):
        affected = OrderRepository.update_order(order_id, OrderStatus(status))
        if affected == 0:
            raise ValueError("Order not found")

        return affected

    @staticmethod
    def delete_order(order_id):
        affected = OrderRepository.delete(order_id)
        if affected == 0:
            raise ValueError("Order not found")

        return affected
