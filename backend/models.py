from extension import db
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB

class Auth(db.Model):
    __tablename__ = 'auth'
    id = db.Column(db.String(15), primary_key=True)
    f_name = db.Column(db.String(10))
    l_name = db.Column(db.String(10))
    mobile = db.Column(db.String(10))
    email = db.Column(db.String(60))
    password = db.Column(db.String(200))

    created = db.Column(
        db.TIMESTAMP(timezone=True), 
        server_default=func.now()
    )

    def __repr__(self):
        return f'<Auth {self.id}>'


