from itsdangerous import JSONWebSignatureSerializer, BadSignature
from zvms import db
from zvms.models import Log

serializer: JSONWebSignatureSerializer

def init_app(app):
    global serializer
    serializer = JSONWebSignatureSerializer(app.config['SECRET_KEY'], app.config['SALT'])

def exists(data):
    print(data['logid'])
    return Log.query.get(int(data['logid']))

def remove(token_data):
    Log.query.filter_by(id=token_data['logid']).delete()
    db.session.commit()

def generate(**data):
    return serializer.dumps(data | {'logid': Log().insert().id}).decode()

def read(token):
    return serializer.loads(token)