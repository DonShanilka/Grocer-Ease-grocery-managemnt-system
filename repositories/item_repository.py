from database.db import get_db

class ItemRepository:

    @staticmethod
    def create_table():
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def save(item):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO items (name) VALUES (%s)",
            (item.name,)
        )
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def find_all():
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM items")
        items = cursor.fetchall()
        cursor.close()
        conn.close()
        return items
