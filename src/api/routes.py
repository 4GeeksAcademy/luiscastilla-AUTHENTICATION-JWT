from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request

api = Blueprint('api', __name__)
CORS(api)

@api.route('/verify-token', methods=['POST'])
def verify_token():
    try:
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        return jsonify({"valid": True, "user": current_user}), 200
    except Exception as e:
        return jsonify({"valid": False, "error": str(e)}), 401

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "El usuario ya está registrado"}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado con éxito"}), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Email o contraseña incorrecta"}), 401

    access_token = create_access_token(identity={"email": user.email})
    return jsonify({"access_token": access_token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify({"msg": f"Bienvenido {current_user['email']}, estás en una página privada"}), 200