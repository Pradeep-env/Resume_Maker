import os
import logging
from logging.handlers import RotatingFileHandler

from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv

from config import Config
from extension import db, jwt

# --------------------------------------------------
# Load environment variables
# --------------------------------------------------
load_dotenv()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # --------------------------------------------------
    # CORS (HEADER-BASED JWT, NO COOKIES)
    # --------------------------------------------------
    CORS(
        app,
        origins=[os.getenv("TARGET")],
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        supports_credentials=False
    )

    # --------------------------------------------------
    # Logging setup (cloud-safe)
    # --------------------------------------------------
    log_dir = os.path.join(os.getcwd(), "logs")
    os.makedirs(log_dir, exist_ok=True)

    class RequestIPFilter(logging.Filter):
        def filter(self, record):
            try:
                record.remote_addr = request.remote_addr
            except RuntimeError:
                record.remote_addr = "-"
            return True

    formatter = logging.Formatter(
        "%(remote_addr)s | %(asctime)s | %(levelname)s | %(message)s"
    )

    handler = RotatingFileHandler(
        os.path.join(log_dir, "app.log"),
        maxBytes=5 * 1024 * 1024,
        backupCount=5
    )
    handler.setLevel(logging.ERROR)
    handler.setFormatter(formatter)
    handler.addFilter(RequestIPFilter())

    app.logger.addHandler(handler)
    app.logger.setLevel(logging.ERROR)

    # --------------------------------------------------
    # Initialize extensions
    # --------------------------------------------------
    db.init_app(app)
    jwt.init_app(app)

    # --------------------------------------------------
    # Register blueprints
    # --------------------------------------------------
    from auth.routes import auth_bp
    app.register_blueprint(auth_bp)

    # --------------------------------------------------
    # TEMP: create tables (DEV ONLY)
    # --------------------------------------------------
    with app.app_context():
        db.create_all()

    # --------------------------------------------------
    # Preflight handling
    # --------------------------------------------------
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            return "", 200

    return app


# --------------------------------------------------
# Run server
# --------------------------------------------------
if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG") == "1"

    app = create_app()
    app.run(host=host, port=port, debug=debug)
