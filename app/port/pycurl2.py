# -*- coding:utf-8 -*-

import pycurl
from StringIO import StringIO

class pycurl_class:

    requestUrl = 'http://172.16.110.101:8030/client.do'
    jsonToObj = ''
    responseJson = ''

    def __init__(self):
        return
    def get_json(self,request):
        # print request
        buffer = StringIO()
        c = pycurl.Curl()
        c.setopt(c.URL, self.requestUrl)
        c.setopt(c.WRITEDATA, buffer)
        c.perform()
        c.close()
        body = buffer.getvalue()
        return body
