from flask import Flask
from controller.item_controller import item_bp
from controller.customer_controller import customer_bp
from controller.supplier_controller import supplier_bp
from controller.delivery_controller import delivery_bp
from controller.order_controller import order_bp

from repositories.item_repository import ItemRepository
from repositories.customer_repository import CustomerRepository
from repositories.supplier_repository import SupplierRepository
from repositories.order_repository import OrderRepository
from repositories.order_item_repository import OrderItemRepository
from repositories.delivery_repository import DeliveryRepository


def create_app():
    app = Flask(__name__)

    app.register_blueprint(item_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(supplier_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(delivery_bp)

    ItemRepository.create_table()
    CustomerRepository.create_table()
    SupplierRepository.create_table()

    OrderRepository.create_table()       
    OrderItemRepository.create_table()   
    DeliveryRepository.create_table()    

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
