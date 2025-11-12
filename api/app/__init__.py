from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .db import db, init_db
from .ws import socketio


def create_app():
    app = Flask(__name__)

    app.config.from_object("app.config.Config")
    CORS(app)
    JWTManager(app)

    db.init_app(app)
    init_db(app)
    socketio.init_app(app, cors_allowed_origins="*")

    register_routes(app)

    return app


# Utilisation de blueprint, qui manage nos routes pour que nos routes puissent etres dans differents fichiers
# plus organiser
def register_routes(app):
    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp

    app.register_blueprint(auth_bp, url_prefix="/api/jeton")
    app.register_blueprint(user_bp, url_prefix="/api/utilisateur")
