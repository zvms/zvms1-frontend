import hashlib

from shell import App
from req import get, post, headers

users = App('users', '用户管理:')

@users.route('user login <int:id> <pwd>')
def login(id, pwd):
    md5 = hashlib.md5()
    md5.update(pwd.encode())
    res = post('/users/login', id=id, pwd=md5.hexdigest())
    if res:
        headers['Authorization'] = res['token']
        print(f'''用户名: {res['name']}
班级: {res['clz']}''')

@users.route('user logout')
def logout():
    post('/users/logout')
    del headers['Authorization']

@users.route('user <int:id>')
def get_user_info(id):
    res = get(f'/users/{id}')
    if res:
        print(res)