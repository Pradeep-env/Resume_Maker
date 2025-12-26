from flask import Blueprint, request, jsonify, make_response, current_app
import json
from utils.validators import valid_email, valid_pass
from models import Auth
from extension import db
from utils.password import hash_password, verify_password
from utils.id_gen import gen_id
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity, unset_access_cookies
import traceback

auth_bp=Blueprint('auth',__name__,url_prefix="/api/v1")

#signup code block
@auth_bp.route("/signup",methods=["POST"])
def signup():
 try:
  data=request.json
  email=data["email"]
  password=data["password"]
  name=data["name"].strip()

  if not valid_email(email):
   return jsonify({"success": False, "msg": "invalid email format"}), 400

  if not valid_pass(password):
   return jsonify({"success": False, "msg": "weak password format"}), 400

  if len(name) < 3 or len(name) > 100:
   return jsonify({"success": False, "msg": "name should be 3 to 100 characters"}), 400

  user=Auth.query.filter_by(email=email).first()
  if user:
   return jsonify({"success": False, "msg": "email is already registered"}), 400
  id=gen_id(36)
  user=Auth(
   id=id,
   name=name,
   email=email,
   password=hash_password(password)
  )

  db.session.add(user)
  db.session.commit()
  return jsonify({"success": True, "msg": "account created successfully"}), 201
 except Exception as e:
  current_app.logger.error(f"Failed: {e} | '/signup'", exc_info=True)
  return jsonify({"success": False, "msg": "something went wrong"}), 500


#login code block
@auth_bp.route("/login",methods=["POST"])
def login():
 try:
  data=request.json
  email=data["email"]
  password=data["password"]

  if not valid_email(email):
   return jsonify({"success": False, "msg": "invalid email format"}), 400

  user=Auth.query.filter_by(email=email).first()
  if not user:
   return jsonify({"success": False, "msg": "incorrect email or password"}), 400
  elif not verify_password(password, user.password):
   return jsonify({"success": False, "msg": "incorrect email or password"}), 400

  data=json.dumps({"id":user.id})
  access_token = create_access_token(data)
  response = make_response(jsonify({"success":True,"msg": "Login successful"}), 200)

  set_access_cookies(response, access_token)
  return response
 except Exception as e:
   current_app.logger.error(f"Failed: {e} | '/signup'", exc_info=True)
   return jsonify({"success": False, "msg": "something went wrong"}), 500

#login state API
@auth_bp.route("/state",methods=["GET"])
@jwt_required()
def state():
 token=get_jwt_identity()
 token=json.loads(token)
 user = Auth.query.get(token["id"])
 if not user:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401
 return jsonify({"success": True, "msg": "logged in"}), 200


#forgot password flow
@auth_bp.route("/forgot",methods=["POST"])
def forgot():
 try:
  data=request.json
  email=data["email"]

  if not valid_email(email):
   return jsonify({"success": False, "msg": "invalid email format"}), 400

  user = Auth.query.filter_by(email=email).first()
  if not user:
   return jsonify({"success": False, "msg": "account not found"}), 400
  return jsonify({"success": True, "msg": "recovery email sent"}), 200
 except Exception as e:
  current_app.logger.error(f"Failed: {e} | '/signup'", exc_info=True)
  return jsonify({"success": False, "msg": "something went wrong"}), 500

#logout API
@auth_bp.route("/logout",methods=["POST"])
@jwt_required()
def logout():
 token=get_jwt_identity()
 token=json.loads(token)
 user = Auth.query.get(token["id"])
 if not user:
  return jsonify({"success": False, "msg": "unauthorized access"}), 401
 resp = jsonify({"success": True, "msg": "Logged out"})
 unset_access_cookies(resp)
 return resp, 200
