from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.auth_service import AuthService

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/auth/register", methods=["POST"])
@cross_origin()
def register():
    try:
        data = request.get_json()
        user_id = AuthService.register(data)
        return jsonify({
            "message": "User registered successfully",
            "user_id": user_id
        }), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print("Registration Error:", e)
        return jsonify({"error": "Internal server error"}), 500

@auth_bp.route("/auth/login", methods=["POST"])
@cross_origin()
def login():
    try:
        data = request.get_json()
        result = AuthService.login(data)
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        print("Login Error:", e)
        return jsonify({"error": "Internal server error"}), 500
