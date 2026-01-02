from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.supplier_service import SupplierService

supplier_bp = Blueprint("supplier_bp", __name__)

@supplier_bp.route("/suppliers", methods=["POST"])
@cross_origin()
def add_supplier():
    try:
        data = request.get_json()

        supplier = SupplierService.add_supplier(data)
        return jsonify({
            "message": "Supplier saved successfully",
            "supplier": {
                "name": supplier.name,
                "phone": supplier.phone,
                "email": supplier.email,
                "address": supplier.address,
                "supplied_items": supplier.supplied_items,
                "price_per_unit": supplier.price_per_unit,
                "qty": supplier.qty,
                "status": supplier.status
            } 
        }), 201
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print("SERVER ERROR:", e)
        return jsonify({"error": "Internal server error"}), 500
    
    
# UPDATE
@supplier_bp.route("/suppliers/<int:id>", methods=["PUT"])
def update_supplier(id):
    try:
        data = request.get_json()

        affected = SupplierService.update_supplier(id, data)

        if affected == 0:
            return jsonify({"error": "Supplier not found"}), 404

        return jsonify({"message": "Supplier updated successfully"}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
    
    
# DELETE
@supplier_bp.route("/suppliers/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_supplier(id):
    try:
        affected = SupplierService.delete_supplier(id)
        
        if affected == 0:
            return jsonify({"error": "Supplier not found"}), 404
        
        return jsonify({"message": "Supplier deleted successfully"}), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
    
    
# GET Supplier by ID
@supplier_bp.route("/suppliers/<int:id>", methods=["GET"])
def get_supplier_by_id(id):
    try:
        supplier = SupplierService.get_supplier_by_id(id)

        if not supplier:
            return jsonify({"error": "Supplier not found"}), 404

        return jsonify({
            "id": supplier["id"],
            "name": supplier["name"],
            "phone": supplier["phone"],
            "email": supplier["email"],
            "address": supplier["address"],
            "supplied_items": supplier["supplied_items"],
            "price_per_unit": supplier["price_per_unit"],
            "qty": supplier["qty"],
            "status": supplier["status"]
        }), 200
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500
    
    
# GET ALL Suppliers
@supplier_bp.route("/suppliers", methods=["GET"])
@cross_origin()
def get_suppliers():
    suppliers = SupplierService.get_all_suppliers()
    return jsonify([dict(supplier) for supplier in suppliers])