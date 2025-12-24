import os
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from logging.handlers import RotatingFileHandler

from config import Config
from extension import db, jwt


load_dotenv()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(
        app,
        supports_credentials=True,
        origins=[os.getenv("TARGET")],
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"]
    )

    class RequestIPFilter(logging.Filter):
      def filter(self, record):
        try:
            from flask import request
            record.remote_addr = request.remote_addr
        except RuntimeError:
            record.remote_addr = "-"
        return True

    formatter = logging.Formatter(
     "%(remote_addr)s | %(asctime)s | %(levelname)s | %(message)s"
    )

    handler = RotatingFileHandler(
     "absolute path/app.log",
     maxBytes=5 * 1024 * 1024,
     backupCount=5
    )

    handler.setLevel(logging.ERROR)
    handler.setFormatter(formatter)
    handler.addFilter(RequestIPFilter())

    app.logger.addHandler(handler)
    app.logger.setLevel(logging.ERROR)

    db.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()


    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            return "", 200

    return app


if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG") == "1"

    app = create_app()
    app.run(host=host, port=port, debug=debug)
