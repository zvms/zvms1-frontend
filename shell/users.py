from shell import App
from req import get, post, headers

users = App('users', '用户管理:')

@users.route('user login <int:id> <pwd>')
def login(id, pwd):
    res = post('/users/login', id=id, pwd=pwd)
    if res:
        headers['Authorization'] = res['token']

@users.route('user logout')
def logout():
    post('/users/logout')

@users.route('user <int:id>')
def get_user_info(id):
    print(get(f'/users/{id}'))