from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from auth.service import create_user, verify_user

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = create_user(email, password)
    if not user:
        return jsonify({"error": "User already exists"}), 409

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = verify_user(email, password)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "user_id": user.id
    }), 200
