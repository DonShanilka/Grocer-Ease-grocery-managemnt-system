from database.db import get_db
from models.orderItem_model import OrderItem

class OrderItemRepository:

    @staticmethod
    def create_table():
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT,
                product_id INT,
                product_name VARCHAR(255),
                price DECIMAL(10,2),
                qty INT,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def save(order_id, item: OrderItem):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO order_items
            (order_id, product_id, product_name, price, qty)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            order_id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
        ))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def find_by_order(order_id):
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM order_items WHERE order_id=%s", (order_id,))
        items = cursor.fetchall()
        cursor.close()
        conn.close()
        return items
