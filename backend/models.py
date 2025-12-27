from extension import db
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB

class Auth(db.Model):
    __tablename__ = "auth"

    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    created = db.Column(
        db.TIMESTAMP(timezone=True), 
        server_default=func.now()
    )

    def __repr__(self):
        return f"<Auth {self.id}>"

class Plans(db.Model):
    __tablename__ = "plans"

    id = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    info = db.Column(JSONB)
    cost = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Plans {self.id}>"

class Profile(db.Model):
    __tablename__ = "profile"

    id = db.Column(db.String(36), db.ForeignKey('auth.id'), primary_key=True)
    city = db.Column(db.String(100), default='Bengaluru, India')
    image = db.Column(db.Text, nullable=True)
    plan = db.Column(db.String(10), db.ForeignKey('plans.id'), nullable=False)
    subscribed = db.Column(db.Boolean, default=True)
    sub_date = db.Column(db.TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<Profile {self.id}>"

class Templates(db.Model):
    __tablename__ = "templates"

    id = db.Column(db.String(20), primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    type = db.Column(db.String(10), nullable=False)
    keys = db.Column(JSONB)
    image = db.Column(db.Text, nullable=False)
    link = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<Templates {self.id}>"


class Articles(db.Model):
    __tablename__ = "articles"

    id = db.Column(db.String(20), primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    type = db.Column(db.String(10), nullable=False)
    keys = db.Column(JSONB)
    image = db.Column(db.Text, nullable=False)
    link = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<Articles {self.id}>"


class Works(db.Model):
    __tablename__ = "works"

    id = db.Column(db.String(32), primary_key=True)
    profile = db.Column(db.String(36), db.ForeignKey('profile.id'), nullable=False)
    template = db.Column(db.String(20), db.ForeignKey('templates.id'), nullable=False)
    progress = db.Column(db.Integer, default=0)
    created = db.Column(db.TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
    info = db.Column(JSONB)

    def __repr__(self):
        return f"<Articles {self.id}>"
