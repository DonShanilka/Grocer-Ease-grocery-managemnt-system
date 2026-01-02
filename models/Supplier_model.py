class Supplier:
    def __init__(self, id=None, name=None, phone=None, email=None, address=None, supplied_items=None, price_per_unit=None, qty=None, status=None):
        self.id = id
        self.name = name
        self.phone = phone
        self.email = email
        self.address = address
        self.supplied_items = supplied_items
        self.price_per_unit = price_per_unit
        self.qty = qty
        self.status = status