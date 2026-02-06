from enum import Enum

class OrderType(Enum):
    TAKEAWAY = "TAKEAWAY"
    DELIVERY = "DELIVERY"

class PaymentType(Enum):
    CASH = "CASH"
    CARD = "CARD"
    ONLINE = "ONLINE"

class OrderStatus(Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    PREPARING = "PREPARING"
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
