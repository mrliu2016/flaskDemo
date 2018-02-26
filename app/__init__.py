# -*- coding:utf-8 -*-

from flask import Flask # 引入flask
app = Flask(__name__) #实例化一个flask对象
from flask_sqlalchemy import SQLAlchemy

#我们的 app 文件夹其实是一个python包，
# from app import views 这句话
# 就是从 包app里面导入 views模块

app.config.from_object('config')
db = SQLAlchemy(app)

from app import models,views


