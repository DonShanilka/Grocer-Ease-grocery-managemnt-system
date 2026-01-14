from repositories.order_item_repository import OrderItemRepository

class OrderItemService:

    @staticmethod
    def get_items_by_order(order_id):
        return OrderItemRepository.find_by_order(order_id)
