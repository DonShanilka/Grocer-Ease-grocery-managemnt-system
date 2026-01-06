import mysql.connector
from config import MYSQL_CONFIG

def get_db():
    conn = mysql.connector.connect(**MYSQL_CONFIG)
    return conn
