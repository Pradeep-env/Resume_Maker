from extension import db
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB

class Auth(db.Model):
    __tablename__ = "auth"

    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created = db.Column(
        db.TIMESTAMP(timezone=True), 
        server_default=func.now()
    )

    def __repr__(self):
        return f"<User {self.email}>"
