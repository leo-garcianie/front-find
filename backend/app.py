from flask import Flask
from flask_cors import CORS
from routes.api_routes import api_bp

def create_app():
    app = Flask(__name__)

    # Configure CORS
    CORS(app,
         resources={r"/api/*": {"origins": "*"}},
         supports_credentials=True)

    # Register routes
    app.register_blueprint(api_bp, url_prefix="/api")

    @app.route("/")
    def index():
        return {'message': 'FrontFind API', 'statis': 'Running'}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)