from ..extensions import db
from datetime import datetime

class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    sku = db.Column(db.String(50), unique=True)
    barcode = db.Column(db.String(50))
    category = db.Column(db.String(50))
    brand = db.Column(db.String(50))
    unit = db.Column(db.String(20), default="unit")
    cost_price = db.Column(db.Float)
    selling_price = db.Column(db.Float)
    stock_quantity = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
