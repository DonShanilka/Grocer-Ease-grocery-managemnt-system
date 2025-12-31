from models.item_model import Item
from repositories.item_repository import ItemRepository

class ItemService:

    @staticmethod
    def add_item(data):
        if not data or not data.get("name"):
            raise ValueError("Item name is required")

        item = Item(
            name=data.get("name"),
            category=data.get("category"),
            price=data.get("price"),
            quantity=data.get("quantity"),
            unit=data.get("unit"),
            description=data.get("description"),
            supplier=data.get("supplier"),
            status=data.get("status", "available"),
            added_date=data.get("added_date")
        )

        ItemRepository.save(item)
        return item  


    @staticmethod
    def update_item(item_id, data):
        if not data.get("name"):
            raise ValueError("Item name is required")

        item = Item(
            name=data.get("name"),
            category=data.get("category"),
            price=data.get("price"),
            quantity=data.get("quantity"),
            unit=data.get("unit"),
            description=data.get("description"),
            supplier=data.get("supplier"),
            status=data.get("status")
        )

        updated = ItemRepository.update(item_id, item)
        if updated == 0:
            raise ValueError("Item not found")


    # Delete item function
    @staticmethod
    def delete_item(item_id):
        deleted = ItemRepository.delete(item_id)
        if deleted == 0:
            raise ValueError("Item not found")

    @staticmethod
    def get_items():
        return ItemRepository.find_all()
