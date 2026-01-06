from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.customer_service import CustomerService

customer_bp = Blueprint("customer_bp", __name__)

@customer_bp.route("/customers", methods=["POST"])
@cross_origin()
def add_customer():
    try:
        data = request.get_json()

        customer = CustomerService.add_customer(data)
        return jsonify({
            "message": "Customer saved successfully",
            "customer": {
                "name": customer.name,
                "email": customer.email,    
                "phone": customer.phone,
                "address": customer.address,
                "item_name": customer.item_name,
                "qty": customer.qty
            } 
        }), 201
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print("SERVER ERROR:", e)
        return jsonify({"error": "Internal server error"}), 500
    
    
# UPDATE
@customer_bp.route("/customers/<int:id>", methods=["PUT"])
def update_customer(id):
    try:
        data = request.get_json()

        affected = CustomerService.update_customer(id, data)

        if affected == 0:
            return jsonify({"error": "Customer not found"}), 404

        return jsonify({"message": "Customer updated successfully"}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
    
    
# DELETE
@customer_bp.route("/customers/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_customer(id):
    try:
        affected = CustomerService.delete_customer(id)

        if affected == 0:
            return jsonify({"error": "Customer not found"}), 404

        return jsonify({"message": "Customer deleted successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
    
    
# GET Customer by ID
@customer_bp.route("/customers/<int:id>", methods=["GET"])
def get_customer_by_id(id):
    try:
        customer = CustomerService.get_customer_by_id(id)
        
        if not customer:
            return jsonify({"error": "Customer not found"}), 404
        
        return jsonify({
            "id": customer["id"],
            "name": customer["name"],
            "email": customer["email"],
            "phone": customer["phone"],
            "address": customer["address"],
            "item_name": customer["item_name"],
            "qty": customer["qty"],
            "registered_date": customer["registered_date"]
        }), 200
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
    
    
    
# GET ALL Customers
@customer_bp.route("/customers", methods=["GET"])
@cross_origin()
def get_customers():
    customers = CustomerService.get_all_customers()
    return jsonify([dict(customer) for customer in customers])
