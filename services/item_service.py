from models.item_model import Item
from repositories.item_repository import ItemRepository

class ItemService:

    @staticmethod
    def add_item(data):
        if not data.get("name"):
            raise ValueError("Item name is required")

        item = Item(
            name = data.get("name"),
            category = data.get("category"),
            price = data.get("price"),
            quantity = data.get("quantity"),
            unit = data.get("unit"),
            description = data.get("description"),
            supplier = data.get("supplier"),
            status = data.get("status", "available"),
            added_date = data.get("added_date")
        )
        ItemRepository.save(item)

    @staticmethod
    def get_items():
        return ItemRepository.find_all()
