from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User

user_bp = Blueprint("user_bp", __name__)


@user_bp.get("/", methods=["GET"])
@jwt_required()
def list_users():
    utilisateurs = User.query.all()
    result = [
        {
            "id": u.id,
            "nom_utilisateur": u.nom_utilisateur,
            "created_at": u.created_at.isoformat(),
        }
        for u in utilisateurs
    ]
    return jsonify(result), 200


@user_bp.get("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User pas trouver"}), 404

    result = {
        "id": user.id,
        "username": user.username,
        "created_at": user.created_at.isoformat(),
    }
    return jsonify(result), 200
