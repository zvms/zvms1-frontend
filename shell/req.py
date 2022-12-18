from urllib.request import urlopen, Request
import json

headers = {}
ip = 'http://172.31.2.3:1145'

def _foo(url, method, args):
    request = Request(url=url, headers=headers, method=method)
    response = urlopen(request, json.dumps(args).encode())
    response = json.loads(response.read())
    print(response['message'])
    if response['type'] == 'SUCCESS':
        return response.get('result')
    for i in response:
        if i not in ('type', 'message'):
            print(i, response[i])
    return None

def get(url):
    return _foo(ip + url, 'GET', {})

def post(url, **args):
    return _foo(ip + url, 'POST', args)