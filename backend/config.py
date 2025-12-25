import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class Config:
    # --------------------
    # Core Flask
    # --------------------
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")

    # --------------------
    # Database
    # --------------------
    SQLALCHEMY_DATABASE_URI = os.getenv("PG_CONN")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # --------------------
    # JWT Configuration (HEADERS BASED)
    # --------------------
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)

    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # Disable cookies completely
    JWT_COOKIE_CSRF_PROTECT = False
