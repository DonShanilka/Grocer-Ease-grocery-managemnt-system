from repositories.delivery_repository import DeliveryRepository

class DeliveryService:

    @staticmethod
    def get_delivery_by_order(order_id):
        delivery = DeliveryRepository.find_by_order(order_id)
        if not delivery:
            raise ValueError("Delivery not found")
        return delivery

    @staticmethod
    def update_delivery_status(id, data: dict):
        """
        Update delivery info including status, address, phone, and driver.
        """
        affected = DeliveryRepository.update_status(id, data)
        if affected == 0:
            raise ValueError("Delivery not found")
        return affected
