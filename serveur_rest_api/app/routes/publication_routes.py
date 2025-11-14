from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Publication, User, Follow
from app.db import db
from app.ws import socketio

publication_bp = Blueprint("publication_bp", __name__)

@publication_bp.get("/")
@jwt_required()
def list_publications():
    publications =  Publication.query.all()
    result = [
        {
            "id": p.id,
            "content": p.content,
            "created_at": p.created_at,
            "auteur": p.user.nom_utilisateur
        } for p in publications
    ]
    return jsonify(result), 200

@publication_bp.get("/<int:pub_id>")
@jwt_required()
def get_publication(pub_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    publication = Publication.query.get_or_404(pub_id)
    result = {
            "id": publication.id,
            "content": publication.content,
            "created_at": publication.created_at,
            "auteur": publication.user.nom_utilisateur
    }
    return jsonify(result), 200

@publication_bp.post("/")
@jwt_required()
def create_publication():
    data = request.get_json()
    current_user = get_jwt_identity()

    if not data or "content" not in data:
        return jsonify({"error": "Contenu est requis."}), 400
    
    current_user = User.query.get(get_jwt_identity())

    new_pub = Publication(
        content=data["content"],
        user_id=current_user.id
    )
    db.session.add(new_pub)
    db.session.commit()
    
    #web socket connection
    socketio.emit("new_publication", {
        "id": new_pub.id,
        "content": new_pub.content,
        "auteur": current_user.nom_utilisateur
    },)

    return jsonify({"message": "Publication creer", "id": new_pub.id}), 201

@publication_bp.get("/par_user/<int:user_id>")
@jwt_required()
def publications_par_user(user_id):
    pubs = Publication.query.filter_by(user_id=user_id).order_by(Publication.created_at.desc()).all()
    result = [
        {
            "id": p.id,
            "content": p.content,
            "created_at": p.created_at.isoformat()
        }
        for p in pubs
    ]

    return jsonify(result), 200