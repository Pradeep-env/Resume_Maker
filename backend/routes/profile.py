from flask import Blueprint, request, jsonify, make_response, current_app
import json
from utils.validators import valid_email, valid_pass
from models import Auth, Profile, Plans
from extension import db
from utils.password import hash_password, verify_password
from utils.id_gen import gen_id
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity, unset_access_cookies
import traceback

profile_bp=Blueprint('profile',__name__,url_prefix="/api/v1")

#profile update
@profile_bp.route("/profile",methods=["POST"])
@jwt_required()
def profile_edit():
 try:
  token=get_jwt_identity()
  token=json.loads(token)
  user = Profile.query.get(token["id"])
  if not user:
   return jsonify({"success": False, "msg": "unauthorized access"}), 400

  data=request.json
  name=data["name"]
  city=data["city"].strip()

  if len(name) < 3 or len(name) > 100:
   return jsonify({"success": False, "msg": "name should be 3 to 100 characters"}), 400

  if len(city) < 3 or len(city) > 100:
   return jsonify({"success": False, "msg": "city name should be 3 to 100 characters"}), 400

  user.name = name
  user.city = city
  db.session.commit()
  return jsonify({"success": True, "msg": "profile updated successfully"}), 201
 except Exception as e:
  current_app.logger.error(f"Failed: {e} | '/profile'", exc_info=True)
  return jsonify({"success": False, "msg": "something went wrong"}), 500


#profile fetch
@profile_bp.route("/profile",methods=["GET"])
@jwt_required()
def profile_info():
 try:
  token=get_jwt_identity()
  token=json.loads(token)
  user = Profile.query.get(token["id"])
  auth = Auth.query.get(token["id"])
  if not user:
   return jsonify({"success": False, "msg": "unauthorized access"}), 400
  plan = Plans.query.get(user.plan)
  data={"name": auth.name, "email": auth.email, "city": user.city, "created": auth.created.strftime("%d-%m-%Y %H:%M"), "plan_start": user.sub_date.strftime("%d-%m-%Y %H:%M"), "subscription": user.subscribed, "image": user.image, "plan": plan.name, "plan_info": plan.info}

  return jsonify({"success": True, "msg": "profile info", "data": data}), 200
 except Exception as e:
   current_app.logger.error(f"Failed: {e} | '/profile'", exc_info=True)
   return jsonify({"success": False, "msg": "something went wrong"}), 500
