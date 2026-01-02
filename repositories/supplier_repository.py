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
        
        
    # Save Supplier
    @staticmethod
    def save(supplier: Supplier):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO suppliers
            (name, phone, email, address, supplied_items, price_per_unit, qty, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?) """, (
                supplier.name,
                supplier.phone,
                supplier.email,
                supplier.address,
                supplier.supplied_items,
                supplier.price_per_unit,
                supplier.qty,
                supplier.status
            ))
        conn.commit()
        cursor.close()
        conn.close()
        
    
    # Update Supplier
    @staticmethod
    def update(id, supplier: Supplier):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE suppliers SET
                name=%s,
                phone=%s,
                email=%s,
                address=%s,
                supplied_items=%s,
                price_per_unit=%s,
                qty=%s,
                status=%s
            WHERE id=%s
        """, (
            supplier.name,
            supplier.phone,
            supplier.email,
            supplier.address,
            supplier.supplied_items,
            supplier.price_per_unit,
            supplier.qty,
            supplier.status,
            id
        ))
        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()
        return affected
    
    
    #Delete Supplier
    @staticmethod
    def delete(id):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM suppliers WHERE id=%s", (id,))
        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()
        return affected
    
    
    # Find Supplier by ID
    @staticmethod
    def find_by_id(id):
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM suppliers WHERE id=%s", (id,))
        
        supplier = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return supplier
    
    
    # Find all Suppliers
    @staticmethod
    def find_all():
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM suppliers")
        
        suppliers = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return suppliers