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


