# -*- coding:utf-8 -*-

from flask import Blueprint,render_template,redirect,request

from pycurl2 import pycurl_class
from requestHd import requestHd

client = Blueprint('client',__name__)

requesthd  = requestHd() #实例化

@client.route('/index')
def index():
    # print request.args.get('transactionType')
    transactionType = request.args.get('transactionType')
    # print type(request.args.get())
    body = ''
    if transactionType == '10020935':
        body = requesthd.ggl_dog_ticket_yhxx(request)
    elif transactionType == '10020936':
        body = requesthd.ggl_enter_game(request)
    elif transactionType == '10020937':
        body = requesthd.ggl_dog_for_ticket(request)
    return body

@client.route('/test')
def test():
    print '111'
    return 'test.111'