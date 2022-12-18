from zvms import app
from zvms.routelib import *
import zvms.impls.users

route(
    rule='/users/login',
    methods='POST',
    impl_func=zvms.impl.users.login,
    params=Object(id=Int, pwd=String),
    auth=None
)