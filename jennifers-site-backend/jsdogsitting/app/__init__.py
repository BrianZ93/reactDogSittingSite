from flask import Flask
from flask_cors import CORS
from config import Config
from helpers import JSONEncoder
from models import db as root_db, ma
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from .api.routes import api


app = Flask(__name__)
CORS(app)

app.register_blueprint(api)

app.json_encoder = JSONEncoder
app.config.from_object(Config)
root_db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, root_db)








@app.route('/')
def home():
    return 'Hello World - Test API HERE'