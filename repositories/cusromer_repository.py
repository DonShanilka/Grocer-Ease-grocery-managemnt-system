from database.db import get_db
from models.customer_model import Customer

class CustomerRepository:
    
    # Create Table
    @staticmethod
    def create_table():
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(50),
                address TEXT,
                item_name VARCHAR(255),
                qty INT,
                registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()
        
    # Save Customer
    @staticmethod
    def save(customer: Customer):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO customers
            (name, email, phone, address, item_name, qty)
            VALUES (%s, %s, %s, %s, %s, %s) """, (
                customer.name,
                customer.email,
                customer.phone,
                customer.address,
                customer.item_name,
                customer.qty
            ))
        conn.commit()
        cursor.close()
        conn.close()
        
        
    # Update Customer
    @staticmethod
    def update(id, customer: Customer):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE customers SET
                name=%s,
                email=%s,
                phone=%s,
                address=%s,
                item_name=%s,
                qty=%s
            WHERE id=%s
        """, (
            customer.name,
            customer.email,
            customer.phone,
            customer.address,
            customer.item_name,
            customer.qty,
            id
        ))
        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()
        return affected
    
    
    # Delete Customer
    @staticmethod
    def delete(id):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM customers WHERE id=%s", (id,))
        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        conn.close()
        return affected
    
    
    # Find Customer by ID
    @staticmethod
    def find_by_id(id):
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM customers WHERE id=%s", (id,))
        
        customer = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return customer
    
    
    # Get All Customers
    @staticmethod
    def find_all():
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM customers")
        
        customers = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return customers