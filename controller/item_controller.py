from flask import Blueprint, request, jsonify
from services.item_service import ItemService

item_bp = Blueprint("item_bp", __name__)

@item_bp.route("/items", methods=["POST"])
def add_item():
    try:
        data = request.json
        ItemService.add_item(data.get("name"))
        return jsonify({"message": "Item saved successfully"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


@item_bp.route("/items", methods=["GET"])
def get_items():
    items = ItemService.get_items()
    return jsonify([dict(item) for item in items])
