from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

import views

app = Flask(__name__)
with open('app.cfg') as f:
    app['SQLALCHEMY_DATABASE_URI'],
    app['SECRET_KEY'],
    app['SALT'] = f
CORS(app, supports_credentials=True,resources={r"/*","*"})

db = SQLAlchemy(app)
db.create_all()
migrate = Migrate(app, db)