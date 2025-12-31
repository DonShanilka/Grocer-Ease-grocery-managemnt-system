from flask import Flask
from controller.item_controller import item_bp
from repositories.item_repository import ItemRepository

def create_app():
    app = Flask(__name__)

    # Register Blueprint
    app.register_blueprint(item_bp)

    # Create DB table once at startup
    ItemRepository.create_table()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
