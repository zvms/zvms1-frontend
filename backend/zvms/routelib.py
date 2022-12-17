from flask import request
from itsdangerous import JSONWebSignatureSerializer, BadSignature
from functools import wraps
import json

from tokenlib import read_token
from zvms import app
from backend.zvms.res import AUTH
from backend.zvms.util import ZvmsError, ZvmsSuccess

def route(*,rule, methods='GET', impl_func, params:int, auth):
    app.add_url_rule(rule, methods=[methods], view_func=deco(impl_func, params, auth))

class Named:
    def __init__(self, raw, name):
        self.raw = raw
        self.name = name
    
    def __call__(self, json):
        return self.raw(json)

    def __str__(self):
        return self.name

Any = Named(lambda _: True, 'any')
Int = Named(lambda x: isinstance(x, int), 'number(int)')
Float = Named(lambda x: isinstance(x, float), 'number(float)')
Number = Named(lambda x: Int(x) or Float(x), 'number')
Boolean = Named(lambda x: isinstance(x, bool), 'boolean')
String = Named(lambda x: isinstance(x, str), 'string')
Null = Named(lambda x: x == None, 'null')

class Array:
    def __init__(self, sub, allow_empty=True):
        self.sub = sub
        self.allow_empty = allow_empty

    def __call__(self, json):
        if not isinstance(json, list):
            return False
        for i in json:
            if not self.sub(json):
                return False
        return self.allow_empty or len(json) > 0

    def __str__(self):
        return f'[ {self.sub}, ... ]{"" if self.allow_empty else "(不可为空)"}'

class Object:
    def __init__(self, **pairs):
        self.pairs = pairs

    def __call__(self, json):
        if not isinstance(json, dict):
            return False
        for k, v in self.pairs.items():
            if k not in json or not v(json[k]):
                return False
        return True

    def __str__(self):
        return '{ ' + ', '.join(map(lambda p: f'"{p[0]}": {p[1]}', self.pairs.items())) + ' }'

class Option:
    def __init__(self, *options):
        self.options = options

    def __call__(self, json):
        for i in self.options:
            if i(json):
                return True
        return False

    def __str__(self):
        return '(' + ' | '.join(map(str, self.options)) + ')'

class Group:
    def __init__(self, *items):
        self.items = items

    def __call__(self, json):
        for i in self.items:
            if not i(json):
                return False
        return True

    def __str__(self):
        return '(' + ' & '.join(map(str, self.options)) + ')'

def parse(json):
    def foo(bar):
        return lambda: bar
    return {
        int: foo('number(int)'),
        float: foo('number(float)'),
        bool: foo('boolean'),
        type(None): foo('null'),
        str: foo('string'),
        list: lambda: '[ ' + ', '.join(map(parse, json)) + ' ]',
        dict: lambda: '{ ' + ', '.join(map(lambda p: f'"{p[0]}": {parse(p[1])}', json), json.items()) + ' }'
    }.get(type(json))

# 以后把调试的代码写在这边，把一些公用的功能也可以移到这边
# 在所有函数名前面加上@Deco()
# 这样路由的函数直接返回一个字典就好了
def deco(impl, params, auth):
    @wraps(impl)
    def wrapper(*args,**kwargs):
        try: # 为了防止空POST出锅
            json_data = json.loads(request.get_data().decode("utf-8"))
        except:
            json_data = {}
            
        if auth != None:
            try:
                token_data = read_token(request.headers.get('AUTHORIZATION'))
                if not (token_data['auth'] & auth) and auth != AUTH_SYSTEM:
                    return json.dumps({'type': 'ERROR', 'message': '权限不足'})
            except:
                token_data = {}
                return json.dumps({'type':'ERROR', 'message':"未获取到Token, 请重新登陆"})

        if not params(json_data):
            return json.dumps({'type': 'ERROR', 'message': '请求接口错误',
                'expected': str(params), 'found': parse(json_data)})

        try:
            impl(*args, **kwargs, json_data=json_data, token_data=token_data)
        except ZvmsError as ex:
            return json.dumps({'type': 'ERROR', 'message': ex.message})
        except ZvmsSuccess as ex:
            r = {'type': 'SUCCESS', 'message': ex.message}
            if ex.result:
                r['result'] = ex.result
            return json.dumps(r)
    return wrapper
