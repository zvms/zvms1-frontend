from shell import App
from users import users

app = App('zvms-shell', '镇海中学义工管理系统终端', title='镇海中学义工管理系统终端')

app.register(users)

if __name__ == '__main__':
    app.run_shell()