# -*- coding:utf-8 -*-
from flask import Blueprint,render_template,redirect,request
from flask import jsonify
from app import db
from .models import User

userAjax = Blueprint('userAjax',__name__)

@userAjax.route('/index')
def index():
    return render_template('user/index.html')
@userAjax.route('/mystring')
def mystring():
    return 'my string'

@userAjax.route('/dataFromAjax')
def dataFromAjax():
    test = request.args.get('mydata')
    print(test)
    return 'dataFromAjax'

@userAjax.route('/mydict', methods=['GET', 'POST'])
def mydict():
    d = {'name': 'xmr', 'age': 18}
    return jsonify(d)

@userAjax.route('/mylist')
def mylist():
    l = ['xmr', 18]
    return jsonify(l)
