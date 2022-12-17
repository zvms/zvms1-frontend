from itsdangerous import JSONWebSignatureSerializer, BadSignature
from models import db, Log
from operator import attrgetter
import random, hashlib
import sys

serializer: JSONWebSignatureSerializer

def exists(data):
    return Log.query.get(int(data['logid']))

def remove(token_data):
    Log.query.filter_by(id=token_data['logid']).delete()
    db.session.commit()

def generate(data):
    return serializer.dumps(data).decode()

def read_token(token):
    return serializer.loads(token)