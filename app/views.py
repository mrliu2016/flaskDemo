# -*- coding:utf-8 -*-
from app import app
from .admin import admin
from .user import user
from .userAjax import userAjax
from .client_json import client_json
from .port import client

from .huodong import huodong

app.register_blueprint(admin,url_prefix='/admin')
app.register_blueprint(user,url_prefix='/user')
app.register_blueprint(userAjax,url_prefix='/userAjax')
app.register_blueprint(client_json,url_prefix='/client_json')
app.register_blueprint(client,url_prefix='/client')


app.register_blueprint(huodong,url_prefix='/huodong')  #活动

