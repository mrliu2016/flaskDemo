# -*- coding:utf-8 -*-

import os
from flask import Blueprint,render_template,redirect,request
from flask import jsonify
from app import db
from .models import User
user = Blueprint('user',__name__)

@user.route('/index')
def index():
    basedir = os.path.abspath(os.path.dirname(__file__))
    return render_template('user/index.html',basedir=basedir)


@user.route('/add/',methods=['GET','POST'])
def add():
    if request.method == 'POST':
        p_user  = request.form.get('username',None)
        p_email = request.form.get('email',None)
        p_password = request.form.get('password',None)

        if not p_user or not p_email or not p_password:
            return 'input error'

        newObj = User(username=p_user,password=p_password,email=p_email)
        db.session.add(newObj)
        db.session.commit()
        users = User.query.all()
        return render_template('user/add.html',users=users)
    users = User.query.all()
    return render_template('user/add.html',users=users)

@user.route('/show')
def show():
    return 'user_show'

