# -*- coding:utf-8 -*-

from flask import Blueprint,render_template,request,redirect
from app import db
from .models import Admin
from client_curl import client_curl
import sys
reload(sys)
import json

admin = Blueprint('admin',__name__)

@admin.route('/index')
def index():
    sys.setdefaultencoding('utf8')
    client = client_curl()
    message = json.loads(client.send_json())
    # message = client.send_json()
    list = message['message']['body']['list']

    return render_template('admin/index.html',list=list)

@admin.route('/add/',methods=['POST','GET'])
def add():
    if request.method == 'POST':
        p_admin = request.form.get('username',None)
        p_password = request.form.get('password',None)
        p_email = request.form.get('email',None)

        if not p_admin or not p_password or not p_email:
            return 'input error'

        newObj = Admin(username=p_admin,password=p_password,email=p_email)
        db.session.add(newObj)
        db.session.commit()
        admins = Admin.query.all()
        return render_template('admin/add.html',admins=admins)
    admins = Admin.query.all()
    return render_template('admin/add.html',admins=admins)

@admin.route('/show')
def show():
    return 'admin_show'

