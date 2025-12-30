# backend/config.py
import urllib.parse

password = urllib.parse.quote_plus("Shanilka800@#")  # Encode special characters
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://root:{password}@localhost:3306/gorcer_ease"
SQLALCHEMY_TRACK_MODIFICATIONS = False
