from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.order_service import OrderService

order_bp = Blueprint("order_bp", __name__)

@order_bp.route("/orders", methods=["POST"])
@cross_origin()
def place_order():
    try:
        data = request.json
        print("Incoming order data:", data)  # <-- add this
        order_id = OrderService.create_order(data)
        return jsonify({
            "message": "Order placed successfully",
            "order_id": order_id
        }), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        print("SERVER ERROR:", e)
        return jsonify({"error": str(e)}), 500  # <-- temporarily show full error



# ================= GET ALL ORDERS =================
@order_bp.route("/orders", methods=["GET"])
@cross_origin()
def get_orders():
    try:
        orders = OrderService.get_orders()
        return jsonify(orders), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500


# ================= GET ORDER BY ID =================
@order_bp.route("/orders/<int:order_id>", methods=["GET"])
@cross_origin()
def get_order_by_id(order_id):
    try:
        result = OrderService.get_order_by_id(order_id)
        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500


# ================= UPDATE ORDER STATUS =================
@order_bp.route("/orders/<int:order_id>/status", methods=["PUT"])
@cross_origin()
def update_order_status(order_id):
    try:
        status = request.json.get("status")
        OrderService.update_order_status(order_id, status)

        return jsonify({"message": "Order status updated successfully"}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500


# ================= DELETE ORDER =================
@order_bp.route("/orders/<int:order_id>", methods=["DELETE"])
@cross_origin()
def delete_order(order_id):
    try:
        OrderService.delete_order(order_id)
        return jsonify({"message": "Order deleted successfully"}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
