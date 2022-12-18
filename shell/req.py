from urllib.request import urlopen, Request
import json

headers = {}
ip = 'http://172.31.2.3:5000'

def _foo(url, args=None):
    request = Request(url, headers)
    if args == None:
        response = urlopen(request)
    else:
        response = urlopen(request, args)
    response = json.loads(response)
    print(response['message'])
    if response['type'] == 'SUCCESS':
        return response.get('result')
    for i in response:
        if i not in ('type', 'message'):
            print(i, response[i])
    return None

def get(url):
    return _foo(ip + url)

def post(url, **args):
    return _foo(ip + url, args)