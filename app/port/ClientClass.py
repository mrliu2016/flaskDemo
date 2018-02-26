# -*- coding:utf-8 -*-

import json
import pycurl
from StringIO import StringIO
# import urllib
from urllib import quote

class ClientClass:

    jsonToObj = ""
    responseJson = ""
    requestUrl = ""

    def __init__(self):
        return

    #转换为json格式
    def set_json(self,jsonStr):
        if jsonStr == '':
            return
        self.responseJson = jsonStr
        self.jsonToObj = json.loads(jsonStr)

    def get_json(self,head,body):

        message = {}
        content = {}
        head['transactionType'] = '10130402'
        head['sysType'] = 'DA'
        head['messageID'] = '88882018011214032844'
        head['timeStamp'] = '20180112140328|20180201160021696'
        head['messengerID'] = '8888'
        head['src'] = '0000200001|5000003200'
        head['imei'] = 'A000004ED4ACAD'
        head['ua'] = 'NX529J'
        head['deviceId'] = 'c2cf942cdbc945977760d7833fa7d17f'
        head['digest'] = '800462349f4dd7bc718b2697245e29ee'
        body['lotteryName'] = 'FC_K3'
        body['timeId']  = '-1'
        message['head'] = head
        message['body'] = body
        content['message'] = message
        # print json.dumps(content)

        url = "http://172.16.110.101:8030/client.do"
        curl_obj = "encry=0&transMessage="+ str(json.dumps(content))
        # py_curl = 'http://172.16.110.101:8030/client.do?encry=0&transMessage={%22message%22:{%22head%22:{%22transactionType%22:%2210130402%22,%22sysType%22:%22DA%22,%22messageID%22:%2288882018011214032844%22,%22timeStamp%22:%2220180112140328%22,%22messengerID%22:%228888%22,%22src%22:%220000200001|5000003200%22,%22imei%22:%22A000004ED4ACAD%22,%22ua%22:%22NX529J%22,%22deviceId%22:%22c2cf942cdbc945977760d7833fa7d17f%22,%22digest%22:%22800462349f4dd7bc718b2697245e29ee%22},%22body%22:{%22lotteryName%22:%22FC_K3%22,%22timeId%22:%22-1%22}}}'
        # py_curl = 'http://172.16.110.101:8030/client.do?encry=0&transMessage={"message": {"body": {"src": "0000200001|5000003200", "deviceId": "c2cf942cdbc945977760d7833fa7d17f", "issue": "20180202", "timeId": "-1", "lotteryName": "FC_K3", "activiFlag": "GGL_DOG", "ua": "NX529J", "messengerID": "8888", "messageID": "88882018011214032844", "imei": "A000004ED4ACAD", "digest": "800462349f4dd7bc718b2697245e29ee", "sysType": "DA", "timeStamp": "20180112140328|20180201160021696", "chatUserId": "105931", "transactionType": "10130402"}, "head": {"src": "0000200001|5000003200", "deviceId": "c2cf942cdbc945977760d7833fa7d17f", "issue": "20180202", "timeId": "-1", "lotteryName": "FC_K3", "activiFlag": "GGL_DOG", "ua": "NX529J", "messengerID": "8888", "messageID": "88882018011214032844", "imei": "A000004ED4ACAD", "digest": "800462349f4dd7bc718b2697245e29ee", "sysType": "DA", "timeStamp": "20180112140328|20180201160021696", "chatUserId": "105931", "transactionType": "10130402"}}}'
        # head2 = ['Accept:*/*',
        #         'User-Agent:Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11']
        # c.setopt(c.URL, apiname)

        buffer = StringIO()
        c = pycurl.Curl()
        c.setopt(c.WRITEDATA, buffer)
        c.setopt(c.POSTFIELDS, curl_obj)
        c.setopt(c.URL, url)  # c.setopt(c.URL,py_curl)
        # c.setopt(pycurl.HTTPHEADER, head2)
        c.perform()
        c.close()
        body = buffer.getvalue()
        buffer.close()

        print  body

        return body
