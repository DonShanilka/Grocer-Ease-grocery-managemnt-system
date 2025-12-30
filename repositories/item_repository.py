from database.db import get_db

class ItemRepository:

    @staticmethod
    def create_table():
        conn = get_db()
        conn.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        """)
        conn.commit()
        conn.close()

    @staticmethod
    def save(item):
        conn = get_db()
        conn.execute("INSERT INTO items (name) VALUES (?)", (item.name,))
        conn.commit()
        conn.close()

    @staticmethod
    def find_all():
        conn = get_db()
        items = conn.execute("SELECT * FROM items").fetchall()
        conn.close()
        return items
