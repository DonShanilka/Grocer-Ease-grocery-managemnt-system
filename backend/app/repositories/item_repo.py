from ..models.item import Item
from ..extensions import db

class ItemRepository:

    @staticmethod
    def save(item: Item):
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def delete(item: Item):
        db.session.delete(item)
        db.session.commit()

    @staticmethod
    def get_all():
        return Item.query.all()

    @staticmethod
    def get_by_id(item_id):
        return Item.query.get(item_id)
