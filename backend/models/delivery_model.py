class Delivery:
    def __init__(
        self,
        order_id,
        address,
        phone,
        delivery_person=None
    ):
        self.order_id = order_id
        self.address = address
        self.phone = phone
        self.delivery_person = delivery_person

        self.delivery_status = "PENDING"
        self.estimated_time = None

    def assign_delivery_person(self, name):
        self.delivery_person = name
        self.delivery_status = "ASSIGNED"

    def mark_delivered(self):
        self.delivery_status = "DELIVERED"
