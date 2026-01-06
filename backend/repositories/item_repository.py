from database.db import get_db
from models.item_model import Item

class ItemRepository:

    # ✅ Create table
    @staticmethod
    def create_table():
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(255),
                price DECIMAL(10,2),
                quantity INT,
                unit VARCHAR(50),
                description TEXT,
                supplier VARCHAR(255),
                status VARCHAR(50),
                added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()

    # ✅ Save item
    @staticmethod
    def save(item: Item):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO items 
            (name, category, price, quantity, unit, description, supplier, status)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            item.name,
            item.category,
            item.price,
            item.quantity,
            item.unit,
            item.description,
            item.supplier,
            item.status
        ))
        conn.commit()
        cursor.close()
        conn.close()

    # ✅ Update item
    @staticmethod
    def update(id, item: Item):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE items SET
                name=%s,
                category=%s,
                price=%s,
                quantity=%s,
                unit=%s,
                description=%s,
                supplier=%s,
                status=%s
            WHERE id=%s
        """, (
            item.name,
            item.category,
            item.price,
            item.quantity,
            item.unit,
            item.description,
            item.supplier,
            item.status,
            id
        ))
        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()
        return affected

    # ✅ Delete item
    @staticmethod
    def delete(id):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM items WHERE id=%s", (id,))
        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()
        return affected


    @staticmethod
    def find_by_id(item_id):
        conn = get_db()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM items WHERE id = %s",
            (item_id,)
        )

        item = cursor.fetchone()

        cursor.close()
        conn.close()

        return item
    

    # ✅ Find all items
    @staticmethod
    def find_all():
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM items")
        
        items = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return items
