# -*- coding:utf-8 -*-
import json

class ClientFactory(object):

    def __init__(self):
        return

    def request(self,params):
        if params['transactionType'] != None and params['transactionType'] != '':
            busiCode = params['transactionType']
            resultInfo = self.execute(busiCode)
        else:
            result = []
            result['resCode'] = 9998
            result['message'] = ''
            resultInfo = json.dumps(result)

    def execute(self,busiCode):
        resultInfo = ''
        if busiCode == '1003':
            resultInfo = 1003
        elif busiCode == '1004':
            resultInfo = 1004
        else:
            resultInfo = '0000'

        return resultInfo

