import os, sys, traceback
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from logging.handlers import RotatingFileHandler

from config import Config
from extension import db, jwt

#Blueprints
from routes.auth import auth_bp
from routes.profile import profile_bp

load_dotenv()


def create_app(config_class=Config):
    app = Flask(__name__)
    
    # Load config
    app.config.from_object(config_class)

    # CORS setup for Render cross-domain cookie auth
    CORS(
     app,
     supports_credentials=True,
     origins=[os.getenv("TARGET")],
     allow_headers=["Content-Type", "Authorization", "X-CSRF-TOKEN"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
   )

    # Logging setup
    # ─── Logging Setup START ───────────────────────────────────────
    class RequestIPFilter(logging.Filter):
        def filter(self, record):
            try:
                # If behind Render's proxy, we want the REAL user IP
                if request.headers.get('X-Forwarded-For'):
                    record.remote_addr = request.headers.get('X-Forwarded-For').split(',')[0]
                else:
                    record.remote_addr = request.remote_addr
            except RuntimeError:
                record.remote_addr = "-"
            return True

    # 2. Define your custom Format
    formatter = logging.Formatter(
        "%(remote_addr)s | %(asctime)s | %(levelname)s | %(message)s"
    )

    # 3. Decide where to send logs based on the environment
    if os.getenv("RENDER"):  # This variable is always 'true' on Render
        # --- CLOUD LOGGING (Console) ---
        handler = logging.StreamHandler(sys.stdout)
    else:
        # --- LOCAL LOGGING (File) ---
        # Get the path relative to where server.py is located
        base_dir = os.path.dirname(os.path.abspath(__file__))
        log_dir = os.path.join(base_dir, "logs")
        
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
            
        handler = RotatingFileHandler(
            os.path.join(log_dir, "app.log"),
            maxBytes=5 * 1024 * 1024,
            backupCount=5
        )

    # 4. Attach the settings to the handler
    handler.setLevel(logging.ERROR)
    handler.setFormatter(formatter)
    handler.addFilter(RequestIPFilter())

    # 5. Attach the handler to the Flask logger
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.ERROR)
# ─── Logging Setup END ─────────────────────────────────────────

    # Initialize extension objects
    db.init_app(app)
    jwt.init_app(app)

    # Auto-create tables
    with app.app_context():
        db.create_all()


    # Fix for CORS preflight rejection
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            return "", 200

    #Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    return app


# ******** LOCAL DEVELOPMENT ONLY ********
if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    debug = os.getenv("DEBUG") == "1"

    app = create_app()
    app.run(host=host, port=port, debug=debug)
