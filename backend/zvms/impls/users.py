from models import User
from util import *
import tokenlib as tk

#[POST] /users/login
def login(id, pwd, token_data):
    '''
    
    '''
    user = User.query.get(id)
    if not user or user.pwd != pwd:
        raise ZvmsError('用户名或密码错误')
    raise ZvmsSuccess('登录成功', name=user.name, clz=user.clz_id, token=tk.generate())