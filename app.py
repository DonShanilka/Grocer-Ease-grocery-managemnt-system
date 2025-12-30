from flask import Flask
from controller.item_controller import item_bp
from repositories.item_repository import ItemRepository

app = Flask(__name__)

# Register Blueprint
app.register_blueprint(item_bp)

# Create table
ItemRepository.create_table()

if __name__ == "__main__":
    app.run(debug=True)
