from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.delivery_service import DeliveryService

delivery_bp = Blueprint("delivery_bp", __name__)

# ================= GET DELIVERY BY ORDER =================
@delivery_bp.route("/deliveries/order/<int:order_id>", methods=["GET"])
@cross_origin()
def get_delivery(order_id):
    try:
        delivery = DeliveryService.get_delivery_by_order(order_id)
        return jsonify(delivery), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500


@delivery_bp.route("/deliveries/order/<int:id>/update", methods=["PUT"])
@cross_origin()
def update_delivery_status(id):
    try:
        data = request.get_json()
        DeliveryService.update_delivery_status(id, data)

        return jsonify({"message": "Delivery updated successfully"}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
