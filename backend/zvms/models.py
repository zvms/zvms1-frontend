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
    auth = db.Column(db.Integer)

class Notice(db.Model):
    __tablename__ = 'notices'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    content = db.Column(db.Text)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    deadtime = db.Column(db.DateTime)


class UserNotice(db.Model):
    __tablename__ = 'users_notices'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    notice_id = db.Column(db.Integer, db.ForeignKey('notices.id'), primary_key=True)

class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)