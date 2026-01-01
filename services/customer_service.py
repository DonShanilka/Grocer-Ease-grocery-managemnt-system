from models.customer_model import Customer
from repositories.customer_repository import CustomerRepository

class CustomerService:
    
    @staticmethod
    def add_customer(data):
        if not data or not data.get("name"):
            raise ValueError("Customer name is required")
        
        customer = Customer(
            name = data.get("name"),
            email = data.get("email"),
            phone = data.get("phone"),
            address = data.get("address"),
            item_name = data.get("item_name"),
            qty = data.get("qty")
        )
        
        CustomerRepository.save(customer)
        return customer