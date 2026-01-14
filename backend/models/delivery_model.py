class Delivery:
    def __init__(self, order_id, delivery_address, contact_phone, delivery_status="PENDING", assigned_driver=None):
        self.order_id = order_id
        self.address = delivery_address
        self.phone = contact_phone
        self.delivery_status = delivery_status
        self.delivery_person = assigned_driver
