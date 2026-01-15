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
            status = data.get("status")
        )
        print("Adding customer in service:", customer)
        CustomerRepository.save(customer)
        return customer
    
    
    @staticmethod
    def update_customer(customer_id, data):
        if not data.get("name"):
            raise ValueError("Customer name is required")
        
        customer = Customer(
            name = data.get("name"),
            email = data.get("email"),
            phone = data.get("phone"),
            address = data.get("address"),
            status = data.get("status")
        )
        
        updated = CustomerRepository.update(customer_id, customer)
        if updated == 0:
            raise ValueError("Customer not found")
        
    
    @staticmethod
    def delete_customer(customer_id):
        deleted = CustomerRepository.delete(customer_id)
        if deleted == 0:
            raise ValueError("Customer not found")
        
        
    @staticmethod
    def get_customer_by_id(customer_id):
        if not customer_id:
            raise ValueError("Customer ID is required")

        customer = CustomerRepository.find_by_id(customer_id)
        if not customer:
            raise ValueError("Customer not found")

        return customer


    # Get all customers
    @staticmethod
    def get_all_customers():
        return CustomerRepository.find_all()