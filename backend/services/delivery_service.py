from repositories.delivery_repository import DeliveryRepository

class DeliveryService:

    @staticmethod
    def get_delivery_by_order(order_id):
        delivery = DeliveryRepository.find_by_order(order_id)
        if not delivery:
            raise ValueError("Delivery not found")
        return delivery

    @staticmethod
    def update_delivery_status(order_id, status):
        affected = DeliveryRepository.update_status(order_id, status)
        if affected == 0:
            raise ValueError("Delivery not found")
        return affected
