from database.db import get_db
from models.delivery_model import Delivery

class DeliveryRepository:

    @staticmethod
    def create_table():
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS deliveries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT,
                delivery_address TEXT,
                contact_phone VARCHAR(50),
                delivery_status VARCHAR(50),
                assigned_driver VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def save(delivery: Delivery):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO deliveries
            (order_id, delivery_address, contact_phone, delivery_status, assigned_driver)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            delivery.order_id,
            delivery.address,
            delivery.phone,
            delivery.delivery_status,
            delivery.delivery_person
        ))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def update_status(id, data: dict):
        """
        Update delivery info including:
        - delivery_status
        - delivery_address
        - contact_phone
        - assigned_driver
        """
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE deliveries
            SET delivery_status=%s,
                delivery_address=%s,
                contact_phone=%s,
                assigned_driver=%s
            WHERE id=%s
        """, (
            data.get("delivery_status"),
            data.get("delivery_address"),
            data.get("contact_phone"),
            data.get("assigned_driver"),
            id
        ))

        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()

        return affected

    @staticmethod
    def find_by_order(order_id):
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM deliveries WHERE order_id=%s", (order_id,))
        delivery = cursor.fetchone()
        cursor.close()
        conn.close()
        return delivery
    
    
    @staticmethod
    def find_all():
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM deliveries")
        
        deliveries = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return deliveries
