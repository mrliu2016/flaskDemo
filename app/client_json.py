# -*- coding:utf-8 -*-

'''
用作ajax跳转用
'''

from flask import Blueprint,render_template,redirect,request
client_json = Blueprint('client_json',__name__)

@client_json.route('/')
def index():
    print request

    return 'test'