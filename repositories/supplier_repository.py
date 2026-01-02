from database.db import get_db
from models.Supplier_model import Supplier

class SupplierRepository:
    
    # Create Table
    @staticmethod
    def create_table():
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS suppliers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT NOT NULL,
                address TEXT NOT NULL,
                supplied_items TEXT NOT NULL,
                price_per_unit REAL NOT NULL,
                qty TEXT NOT NULL,
                status TEXT NOT NULL
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()