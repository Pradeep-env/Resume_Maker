from werkzeug.security import generate_password_hash, check_password_hash
from auth.models import User
from extension import db

def create_user(email, password):
    if User.query.filter_by(email=email).first():
        return None

    user = User(
        email=email,
        password_hash=generate_password_hash(password)
    )
    db.session.add(user)
    db.session.commit()
    return user

def verify_user(email, password):
    user = User.query.filter_by(email=email).first()
    if not user:
        return None

    if not check_password_hash(user.password_hash, password):
        return None

    return user
