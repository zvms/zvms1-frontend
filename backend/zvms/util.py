from flask_sqlalchemy.query import Query
from sqlalchemy.orm.collections import InstrumentedList

from zvms import db

class ZvmsError(Exception):
    def __init__(self, message):
        self.message = message

class ZvmsSuccess(Exception):
    def __init__(self, message, **result):
        self.message = message
        self.result = result

no_commit = False

def debug_mode(on=None):
    global no_commit
    if on == None:
        return not no_commit
    no_commit = not on

def get_or_error(self, *args, **kwargs):
    ret = self.get(*args **kwargs)
    if ret:
        return ret
    raise ZvmsError('未查找到相关记录')

def select(self, *cols, **aliases):
    return dict(zip(cols + tuple(aliases.values()), map(self.__getattribute__, cols + tuple(aliases.keys()))))

def update(self, **kwargs):
    for k, v in kwargs.items():
        self.__setattr__(k, v)
    if not no_commit:
        db.session.commit()

def insert(self):
    db.session.add(self)
    if not no_commit:
        db.session.commit()
    return self

def __init__(self, **kwargs):
    for k, v in kwargs.items():
        self.__setattr__(k, v)

db.Model.get_or_error = get_or_error
db.Model.select = select
db.Model.update = update
db.Model.insert = insert
db.Model.__init__ = __init__

def apply(func):
    return lambda self, *cols, **aliases: map(lambda x: func(x, *cols, **aliases), self)

Query.select = InstrumentedList.select = apply(select)
Query.update = InstrumentedList.update = apply(update)
Query.select_value = InstrumentedList.select_value = apply(lambda x: [x.__getattribute__(i) for i in x])