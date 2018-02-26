# -*- coding:utf-8 -*-


from client_curl import client_curl
import json


client = client_curl()


# print client.send_json()

obj = json.loads(client.send_json())

print obj