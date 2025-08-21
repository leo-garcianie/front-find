from data.frameworks_data import FRAMEWORKS
import copy

class RecommendationService:
    def __init__(self):
        self.frameworks = FRAMEWORKS
        self.max_possible_score = 100

    def calculate_recommendations(self, answers):
        scores = {}

        # Initialize scores
        for framework in self.frameworks:
            scores[framework['id']] = 0

        # Question 1: Experience Level
        for framework in self.frameworks:
            experience_math = {
                'b': 10 if framework['recommended_experience_level'] == 'beginner' else 0,
                'i': 10 if framework['recommended_experience_level'] == 'intermediate' else 0,
                'a': 10 if framework['recommended_experience_level'] == 'advanced' else 0,
            }
            scores[framework['id']] += experience_math.get(answers.get('1', 0))

        # Question 2: Project Compatibility
        for framework in self.frameworks:
            project_type_map = {
                'info':'landing_page',
                'blog': 'blog',
                'spa': 'spa',
                'mpa': 'mpa',
                'dash': 'dashboard',
                'ecom': 'ecommerce',
            }
            project_key = project_type_map.get(answers.get('2'))
            if project_key and project_key in framework['project_compatibility']:
                scores[framework['id']] += framework['project_compatibility'][project_key] * 2
            else:
                scores[framework['id']] =+ 3

        # Question 3: Learning Curve
        for framework in self.frameworks:
            learning_curve_match = {
                'quick': 6 - framework['learning_curve'],
                'complex': framework['learning_curve'],
                'balance': 5 - abs(3 - framework['learning_curve']),
            }
            scores[framework['id']] += learning_curve_match.get(answers.get('3'), 0) * 2

        # Question 4: Performance
        for framework in self.frameworks:
            performance_weight = {
                'cri': 3,
                'imp': 2,
                'neu': 1,
            }
            weight = performance_weight.get(answers.get('4'), 1)
            scores[framework['id']] += framework['performance'] * weight

        # Question 5: SEO
        for framework in self.frameworks:
            seo_match = {
                'yes': 10 if framework['seo_support'] >= 4 else (5 if framework['seo_support'] >= 3 else 0),
                'helpful': 5 if framework['seo_support'] >= 3 else 0,
                'no': 5,  # No impact on score
            }
            scores[framework['id']] += seo_match.get(answers.get('5'), 0)

        # Question 6: Team size
        for framework in self.frameworks:
            team_size_map = {
                'solo': 'individual',
                'small': 'small_team',
                'large': 'large_team',
            }
            team_key = team_size_map.get(answers.get('6'))
            if team_key and team_key in framework['team_adaptation']:
                scores[framework['id']] += framework['team_adaptation'][team_key] * 2

        # Question 7: JavaScript Experience
        for framework in self.frameworks:
            js_experience_match = {
                'b': 10 if framework['required_js_experience'] == 'basic' else 5,
                'i': 10 if framework['required_js_experience'] == 'intermediate' else 5,
                'a': 10 if framework['required_js_experience'] == 'advanced' else 0,
            }
            scores[framework['id']] += js_experience_match.get(answers.get('7'), 0)

        # Question 8: Integrations
        if answers.get('8'):
            integrations = answers.get('8') if isinstance(answers.get('8'), list) else [answers.get('8')]

            for framework in self.frameworks:
                for integration in integrations:
                    integration_map = {
                        'apis': 'rest_api',
                        'db': 'real_time',
                        'auth': 'authentication',
                        'no': 'standalone',
                    }
                    integration_key = integration_map.get(integration)
                    if integration_key and framework['integrations'].get(integration_key):
                        scores[framework['id']] += 5

        # Question 9: Community and documentation
        for framework in self.frameworks:
            community_weight = {
                'very': 3,
                'useful': 2,
                'not': 1,
            }
            weight = community_weight.get(answers.get('9'), 1)
            community_score = (framework['community'] + framework['documentation']) / 2
            scores[framework['id']] += community_score * weight

        # Question 10: Scalability and ease of maintenance
        for framework in self.frameworks:
            scalability_weight = {
                'very': 3,
                'imp': 2,
                'not': 1,
            }
            weight = scalability_weight.get(answers.get('10'), 1)
            scalability_score = (framework['scalability'] + framework['ease_of_maintenance']) / 2
            scores[framework['id']] += scalability_score * weight

        # Extra points: Popularity
        for framework in self.frameworks:
            popularity_bonus = 16 - framework['popularity']
            scores[framework['id']] += popularity_bonus * 0.5

        # Convert to array with accuracy
        results = []
        for framework in self.frameworks:
            framework_copy = copy.deepcopy(framework)
            score = scores[framework['id']]
            accuracy = round((score / self.max_possible_score) * 100)

            framework_copy['score'] = score
            framework_copy['accuracy'] = min(accuracy, 98)
            results.append(framework_copy)

        # Order by score
        results.sort(key=lambda x: x['score'], reverse=True)

        return results