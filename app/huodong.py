# -*- coding:utf-8 -*-

from flask import Blueprint,render_template,request,redirect
import os
huodong = Blueprint('huodong',__name__)

@huodong.route('/index')
def index():
    return 'index'

@huodong.route('/sgdxd')
def sgdxd():
    # basedir = os.path.abspath(os.path.dirname(__file__))

    base_dir = 'http://127.0.0.1:5000/static/images/'  #可以设置ip或域名
    print base_dir
    return render_template('huodong/index.html',basedir=base_dir)

@huodong.route('/sgdxd_game')
def sgdxd_game():
    return render_template('huodong/game.html')