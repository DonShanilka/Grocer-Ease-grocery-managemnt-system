from repositories.order_repository import OrderRepository
from repositories.order_item_repository import OrderItemRepository
from repositories.delivery_repository import DeliveryRepository
from models.order_model import Order
from models.delivery_model import Delivery
from enums.order_enums import OrderType, PaymentType, OrderStatus
from models.orderItem_model import OrderItem  

class OrderService:

    @staticmethod
    def create_order(data):
        if not data.get("customer_name"):
            raise ValueError("Customer name is required")
        if not data.get("items") or len(data["items"]) == 0:
            raise ValueError("Order items are required")

        items = []
        for i in data["items"]:
            items.append(OrderItem(i.get("product_id"), i["item_name"], i["price"], i["quantity"]))

        order = Order(None, data["customer_name"], OrderType(data["order_type"]), PaymentType(data["payment_type"]), items)
        order_id = OrderRepository.save(order)

        for item in items:
            OrderItemRepository.save(order_id, item)

        if order.order_type == OrderType.DELIVERY:
            delivery = Delivery(order_id, data.get("delivery_address"), data.get("contact_phone"))
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
        return {"order": order, "items": items, "delivery": delivery}

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
