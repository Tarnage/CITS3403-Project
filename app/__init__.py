from flask import Flask
from config import Config, TestingConfig, ProductionConfig, DevelopmentConfig
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)

# CONFIGURATION OPTIONS
app.config.from_object("config.ProductionConfig")
#app.config.from_object("config.DevelopmentConfig")
# USE THIS CONFIG FOR SYSTEM TESTS
#app.config.from_object("config.TestingConfig")


db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)

from app import routes, models