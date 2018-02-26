# -*-  coding:utf-8 -*-

'''
请求url获取数据
'''

import requests
import urllib
import urllib2
import json


class client_curl():

    requestUrl = 'http://172.16.110.101:8030/client.do'
    jsonToObj = ''
    responseJson = ''

    postData = 'encry=0&transMessage={"message":{"head":{"transactionType":"10130402","sysType":"DA","messageID":"88882018011214032844","timeStamp":"20180112140328","messengerID":"8888","src":"0000200001|5000003200","imei":"A000004ED4ACAD","ua":"NX529J","deviceId":"c2cf942cdbc945977760d7833fa7d17f","digest":"800462349f4dd7bc718b2697245e29ee"},"body":{"lotteryName":"FC_K3","timeId":"-1"}}}'

    def __init__(self):
        return

    def set_json(self,jsonStr):
        if jsonStr == '':
            return
        self.responseJson = jsonStr
        self.jsonToObj = json.loads(jsonStr)

    def get_head_value(self,key):
        val = []

        return val

    def get_body_value(self,key):
        val = []

    def send_json(self):
        # req = urllib2.Request(self.post_url)
        return urllib2.urlopen('http://172.16.110.101:8030/client.do?encry=0&transMessage={%22message%22:{%22head%22:{%22transactionType%22:%2210130402%22,%22sysType%22:%22DA%22,%22messageID%22:%2288882018011214032844%22,%22timeStamp%22:%2220180112140328%22,%22messengerID%22:%228888%22,%22src%22:%220000200001|5000003200%22,%22imei%22:%22A000004ED4ACAD%22,%22ua%22:%22NX529J%22,%22deviceId%22:%22c2cf942cdbc945977760d7833fa7d17f%22,%22digest%22:%22800462349f4dd7bc718b2697245e29ee%22},%22body%22:{%22lotteryName%22:%22FC_K3%22,%22timeId%22:%22-1%22}}}').read()

    def analy_json(self,jsonStr):
        if json.loads(jsonStr) == None:
            return False
        return True