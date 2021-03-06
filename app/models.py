# -*- coding:utf-8 -*-

from app import db # db是在app/__init__.py生成的关联后的SQLAlchemy实例
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(80),unique=True)
    password = db.Column(db.String(32),nullable=False)
    email    = db.Column(db.String(320),unique=True)

    def __repr__(self):
        return '<User %r>' % self.username

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(80),unique=True)
    password = db.Column(db.String(32),nullable=False)
    email    = db.Column(db.String(320),unique=True)

    def __repr__(self):
        return '<User %r>' % self.username




