# -*- coding:utf-8 -*-

import json
import time
from ClientClass import ClientClass
from pycurl2 import pycurl_class

class requestHd:

    def __init__(self):
        self.clientClass = ClientClass()
        return

    def get_interface_data(self,head,body):
        return_json = ''
        return_json = self.clientClass.get_json(head,body)
        return return_json

    #刮刮乐狗票用户信息 (10020935)
    def ggl_dog_ticket_yhxx(self,request):
        print request.args.get('transactionType')
        # pycurl_c = pycurl_class()
        # body = pycurl_c.get_json(request)

        head = body = {};
        head['transactionType'] = '10020935'
        body['chatUserId'] = '105931'
        body['activiFlag'] = 'GGL_DOG'
        body['issue'] = time.strftime("%Y%m%d",time.localtime())
        # print body
        # url = 'http://172.16.110.234:8060/protocol.do'
        return_json = self.get_interface_data(head,body);
        # print return_json

        return return_json


    #刮刮乐狗票进入游戏 (10020936)
    def ggl_enter_game(self):
        return ''

    #刮刮乐狗票找票 (10020937)
    def ggl_dog_for_ticket(self):
        return ''

