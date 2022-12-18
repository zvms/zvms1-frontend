from shell import App

users = App('users', '用户管理:')

@users.route('user login <int:id> <pwd>')
def login(id, pwd):
    print('login', id, pwd)

@users.route('user logout')
def logout():
    print('logout')