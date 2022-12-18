from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
with open('app.cfg') as f:
    app.config['SQLALCHEMY_DATABASE_URI'], \
    app.config['SECRET_KEY'], \
    app.config['SALT'] = map(lambda s: s[:-1], f)
CORS(app, supports_credentials=True,resources={r"/*","*"})

app.test_request_context().push()
db = SQLAlchemy(app)
db.create_all()
migrate = Migrate(app, db)