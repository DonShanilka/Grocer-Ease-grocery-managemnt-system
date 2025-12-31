from flask import Blueprint, request, jsonify
from services.item_service import ItemService
from flask_cors import cross_origin

item_bp = Blueprint("item_bp", __name__)

@item_bp.route("/items", methods=["POST"])
@cross_origin()
def add_item():
    try:
        data = request.get_json()

        item = ItemService.add_item(data)

        return jsonify({
            "message": "Item saved successfully",
            "item": {
                "name": item.name,
                "category": item.category,
                "price": item.price,
                "quantity": item.quantity,
                "unit": item.unit,
                "status": item.status
            }
        }), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        print("SERVER ERROR:", e) 
        return jsonify({"error": "Internal server error"}), 500


# UPDATE
@item_bp.route("/items/<int:id>", methods=["PUT"])
def update_item(id):
    try:
        data = request.get_json()

        affected = ItemService.update_item(id, data)

        if affected == 0:
            return jsonify({"error": "Item not found"}), 404

        return jsonify({"message": "Item updated successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

    

# DELETE
@item_bp.route("/items/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_item(id):
    try:
        ItemService.delete_item(id)
        return jsonify({"message": "Item deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
        
# GET ALL ITEMS
@item_bp.route("/items", methods=["GET"])
@cross_origin()
def get_items():
    items = ItemService.get_items()
    return jsonify([dict(item) for item in items])
