from models.Supplier_model import Supplier
from repositories.supplier_repository import SupplierRepository

class SupplierService:
    
    @staticmethod
    def add_supplier(data):
        if not data or not data.get("name"):
            raise ValueError("Supplier name is required")
        
        supplier  = Supplier(
            name = data.get("name"),
            phone = data.get("phone"),
            email = data.get("email"),
            address = data.get("address"),
            supplied_items = data.get("supplied_items"),
            price_per_unit = data.get("price_per_unit"),
            qty = data.get("qty"),
            status = data.get("status", "active")
        )
        
        SupplierRepository.save(supplier)
        return supplier
    
    
    @staticmethod
    def update_supplier(supplier_id, data):
        if not data.get("name"):
            raise ValueError("Supplier name is required")
        
        supplier  = Supplier(
            name = data.get("name"),
            phone = data.get("phone"),
            email = data.get("email"),
            address = data.get("address"),
            supplied_items = data.get("supplied_items"),
            price_per_unit = data.get("price_per_unit"),
            qty = data.get("qty"),
            status = data.get("status")
        )
        
        updated = SupplierRepository.update(supplier_id, supplier)
        if updated == 0:
            raise ValueError("Supplier not found")
        
        
    @staticmethod
    def delete_supplier(supplier_id):
        deleted = SupplierRepository.delete(supplier_id)
        if deleted == 0:
            raise ValueError("Supplier not found")