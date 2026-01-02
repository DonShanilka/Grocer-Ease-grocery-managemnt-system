from flask import Flask
from controller.item_controller import item_bp
from controller.customer_controller import customer_bp
from controller.supplier_controller import supplier_bp

from repositories.item_repository import ItemRepository
from repositories.customer_repository import CustomerRepository
from repositories.supplier_repository import SupplierRepository

def create_app():
    app = Flask(__name__)

    # Register Blueprint
    app.register_blueprint(item_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(supplier_bp)

    # Create DB table once at startup
    ItemRepository.create_table()
    CustomerRepository.create_table()
    SupplierRepository.create_table()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
