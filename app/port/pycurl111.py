# -*- coding:utf-8 -*-

import pycurl
from StringIO import StringIO
buffer = StringIO()
c = pycurl.Curl()
c.setopt(c.URL, 'http://www.pythontab.com/')
c.setopt(c.WRITEDATA, buffer)
c.perform()
c.close()
body = buffer.getvalue()
print(body)


