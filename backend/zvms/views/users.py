from zvms.routelib import *
import zvms.impls.users

route(
    rule='/users/login',
    method='POST',
    impl_func=zvms.impls.users.login,
    params=Object(id=Int, pwd=String),
    auth=None
)

route(
    rule='/users/logout',
    method='POST',
    impl_func=zvms.impls.users.logout,
    auth=None
)

route(
    rule='/users/<int:id>',
    method='GET',
    impl_func=zvms.impls.users.get_user_info,
)