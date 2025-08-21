from flask import Blueprint, request, jsonify
from services.recommendation_service import RecommendationService
from models.response import RecommendationResult
from data.frameworks_data import QUESTIONS, FRAMEWORKS
from utils.validators import validate_answers
from datetime import datetime

api_bp = Blueprint('api', __name__)
recommendation_service = RecommendationService()

@api_bp.route('/questions', methods=['GET'])
def get_questions():
    try:
        return jsonify({
            'success': True,
            'questions': QUESTIONS
        }),200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error getting questions: {str(e)}'
        }), 500

@api_bp.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()

        if not data or 'answers' not in data:
            return jsonify({
                'success': False,
                'error': 'No answers provided'
            }), 400

        answers = data['answers']

        # Validate answers
        validation_result = validate_answers(answers)
        if not validation_result['valid']:
            return jsonify({
                'success': False,
                'error': validation_result['message']
            }), 400

        # Calculate recommendations using the algorithm
        frameworks = recommendation_service.calculate_recommendations(answers)

        # Get the top frameworks
        top_recommendation = frameworks[0] if frameworks else None

        # Create user profile
        user_profile = _create_user_profile(answers)

        # Create result
        result = RecommendationResult(
            frameworks=frameworks,
            top_recommendation=top_recommendation,
            user_profile=user_profile
        )

        return jsonify({
            'success': True,
            'data': result.to_dict(),
            'timestamp': datetime.now().isoformat()
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error getting recommendations: {str(e)}'
        }), 500

@api_bp.route('/frameworks', methods=['GET'])
def get_all_frameworks():
    try:
        return jsonify({
            'success': True,
            'frameworks': FRAMEWORKS
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error getting frameworks: {str(e)}'
        }), 500

@api_bp.route('/framework/<int:framework_id>', methods=['GET'])
def get_framework_details(framework_id):
    try:
        framework = next((f for f in FRAMEWORKS if f['id'] == framework_id), None)

        if not framework:
            return jsonify({
                'success': False,
                'error': 'Framework not found'
            }), 404

        return jsonify({
            'success': True,
            'framework': framework
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error getting framework details: {str(e)}'
        }), 500

def _create_user_profile(answers):
    """Create user profile based on the responses"""
    profile = {}

    # Experience level
    exp_mapping = {
        'b': 'Beginner',
        'i': 'Intermediate',
        'a': 'Advanced'
    }
    profile['experience_level'] = exp_mapping.get(answers.get('1'), 'Unknown')

    # Project type
    project_mapping = {
        'info': 'Landing Page',
        'blog': 'Blog/Content Site',
        'spa': 'Single Page Application',
        'mpa': 'Multi Page Application',
        'dash': 'Dashboard/Admin Panel',
        'ecom': 'E-commerce Store'
    }
    profile['project_type'] = project_mapping.get(answers.get('2'), 'Unknown')

    # Learning preferences
    learning_pref = {
        'quick': 'Prefers Simple & Quick to Learn',
        'complex': 'Prefers Powerful Features',
        'balance': 'Wants Balance of Ease & Power'
    }
    profile['learning_preference'] = learning_pref.get(answers.get('3'), 'Unknown')

    # Priorities
    priorities = []
    if answers.get('4') == 'cri':
        priorities.append('High Performance')
    if answers.get('5') == 'yes':
        priorities.append('SEO Optimization')
    if answers.get('9') == 'very':
        priorities.append('Strong Community')
    if answers.get('10') == 'very':
        priorities.append('Long-term Maintainability')

    profile['priorities'] = priorities if priorities else ['Standard Requirements']

    # Team size
    team_mapping = {
        'solo': 'Solo Developer',
        'small': 'Small Team (2-5)',
        'large': 'Large Team (5+)'
    }
    profile['team_size'] = team_mapping.get(answers.get('6'), 'Unknown')

    # JavaScript experience
    js_mapping = {
        'b': 'Basic JavaScript',
        'i': 'Intermediate JavaScript',
        'a': 'Advanced JavaScript'
    }
    profile['js_experience'] = js_mapping.get(answers.get('7'), 'Unknown')

    return profile