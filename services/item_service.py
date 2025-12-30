from models.item_model import Item
from repositories.item_repository import ItemRepository

class ItemService:

    @staticmethod
    def add_item(name):
        if not name:
            raise ValueError("Item name is required")

        item = Item(name=name)
        ItemRepository.save(item)

    @staticmethod
    def get_items():
        return ItemRepository.find_all()
