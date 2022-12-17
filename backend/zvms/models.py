from operator import attrgetter
import datetime
import hashlib

from zvms import db

class Class(db.Model):
    __tablename__ = 'classes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5))

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5))
    clz_id = db.Column(db.Integer, db.ForeignKey('classes.id'), name='class')
    pwd = db.Column(db.String(32))

class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)