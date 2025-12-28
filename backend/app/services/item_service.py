from ..models.item import Item
from ..repositories.item_repo import ItemRepository

class ItemService:

    @staticmethod
    def create_item(data):
        item = Item(**data)
        return ItemRepository.save(item)

    @staticmethod
    def update_item(item_id, data):
        item = ItemRepository.get_by_id(item_id)
        if not item:
            return None
        for key, value in data.items():
            setattr(item, key, value)
        ItemRepository.update()
        return item

    @staticmethod
    def delete_item(item_id):
        item = ItemRepository.get_by_id(item_id)
        if not item:
            return None
        ItemRepository.delete(item)
        return item

    @staticmethod
    def get_all_items():
        return ItemRepository.get_all()

    @staticmethod
    def get_item_by_id(item_id):
        return ItemRepository.get_by_id(item_id)
