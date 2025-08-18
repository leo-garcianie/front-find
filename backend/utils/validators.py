from typing import Dict, Any

def validate_answers(answers: Dict[str, Any]) -> Dict[str, Any]:
    if not answers:
        return {
            'valid': False,
            'message': 'No answers provided'
        }

    # Validate all questions were answered
    required_questions = [str(i) for i in range(1, 11)]
    missing_questions = []

    for question_id in required_questions:
        if question_id not in answers:
            missing_questions.append(question_id)
        elif not answers[question_id] or answers[question_id].strip() == '':
            missing_questions.append(question_id)

    if missing_questions:
        return {
            'valid': False,
            'message': 'Missing answers for questions'
        }

    # Validate valid options for each question
    valid_options = {
        '1': ['b', 'i', 'a'],
        '2': ['info', 'blog', 'spa', 'mpa', 'dash', 'ecom'],
        '3': ['quick', 'complex', 'balance'],
        '4': ['cri', 'imp', 'neu'],
        '5': ['yes', 'helpful', 'no'],
        '6': ['solo', 'small', 'large'],
        '7': ['b', 'i', 'a'],
        '8': ['apis', 'db', 'auth', 'no'],
        '9': ['very', 'useful', 'not'],
        '10': ['very', 'imp', 'not']
    }

    invalid_answers = []
    for question_id, valid_opts in valid_options.items():
        if question_id in answers:
            answer = answers[question_id]
            if answer not in valid_opts:
                invalid_answers.append(f'Question {question_id}: {answer}')

    if invalid_answers:
        return {
            'valid': False,
            'message': 'Invalid answers for questions'
        }

    return {
        'valid': True,
        'message': 'All questions validated'
    }