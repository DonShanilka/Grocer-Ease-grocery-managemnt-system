import jwt
import datetime
import bcrypt
from config import SECRET_KEY
from repositories.user_repository import UserRepository
from models.user_model import User

class AuthService:

    @staticmethod
    def register(data):
        if not data.get("username") or not data.get("email") or not data.get("password"):
            raise ValueError("Username, email, and password are required")

        if UserRepository.find_by_username(data["username"]):
            raise ValueError("Username already exists")
        
        if UserRepository.find_by_email(data["email"]):
            raise ValueError("Email already exists")

        # Hash password
        hashed_pw = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        user = User(None, data["username"], data["email"], hashed_pw, data.get("role", "user"))
        user_id = UserRepository.save(user)
        return user_id

    @staticmethod
    def login(data):
        identifier = data.get("username") or data.get("email")
        password = data.get("password")

        if not identifier or not password:
            raise ValueError("Username/Email and password are required")

        # Search by username first, then email if not found
        user_data = UserRepository.find_by_username(identifier)
        if not user_data:
            user_data = UserRepository.find_by_email(identifier)
        
        if not user_data:
            raise ValueError("Invalid credentials")

        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user_data["password"].encode('utf-8')):
            raise ValueError("Invalid credentials")

        # Generate Token
        token = AuthService.generate_token(user_data)
        return {
            "token": token,
            "user": {
                "id": user_data["id"],
                "username": user_data["username"],
                "email": user_data["email"],
                "role": user_data["role"]
            }
        }

    @staticmethod
    def generate_token(user_data):
        payload = {
            "user_id": user_data["id"],
            "username": user_data["username"],
            "role": user_data["role"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
