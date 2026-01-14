from database.db import get_db
from models.order_model import Order

class OrderRepository:

    @staticmethod
    def create_table():
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_name VARCHAR(255) NOT NULL,
                order_type VARCHAR(50) NOT NULL,
                payment_type VARCHAR(50) NOT NULL,
                status VARCHAR(50),
                total_amount DECIMAL(10,2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.commit()
        cursor.close()
        conn.close()


    @staticmethod
    def save(order: Order):
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO orders
            (customer_name, order_type, payment_type, status, total_amount)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            order.customer_name,
            order.order_type.value,
            order.payment_type.value,
            order.status.value,
            order.total_amount
        ))

        conn.commit()
        order_id = cursor.lastrowid
        cursor.close()
        conn.close()

        return order_id


    @staticmethod
    def update_order(order_id, status):
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE orders SET status=%s WHERE id=%s
        """, (status.value, order_id))

        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()

        return affected