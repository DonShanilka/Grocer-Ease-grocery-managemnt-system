from flask import Blueprint, request, jsonify
from ..services.item_service import ItemService

item_bp = Blueprint("item_bp", __name__, url_prefix="/api/items")

@item_bp.route("/", methods=["POST"])
def create_item():
    data = request.json
    item = ItemService.create_item(data)
    return jsonify({"id": item.id, "message": "Item created successfully"}), 201

@item_bp.route("/", methods=["GET"])
def get_items():
    items = ItemService.get_all_items()
    return jsonify([
        {
            "id": i.id,
            "name": i.name,
            "sku": i.sku,
            "barcode": i.barcode,
            "category": i.category,
            "brand": i.brand,
            "unit": i.unit,
            "cost_price": i.cost_price,
            "selling_price": i.selling_price,
            "stock_quantity": i.stock_quantity
        } for i in items
    ])

@item_bp.route("/<int:item_id>", methods=["GET"])
def get_item(item_id):
    item = ItemService.get_item_by_id(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    return jsonify({
        "id": item.id,
        "name": item.name,
        "sku": item.sku,
        "barcode": item.barcode,
        "category": item.category,
        "brand": item.brand,
        "unit": item.unit,
        "cost_price": item.cost_price,
        "selling_price": item.selling_price,
        "stock_quantity": item.stock_quantity
    })

@item_bp.route("/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    data = request.json
    item = ItemService.update_item(item_id, data)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    return jsonify({"message": "Item updated successfully"})

@item_bp.route("/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    item = ItemService.delete_item(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    return jsonify({"message": "Item deleted successfully"})
