from dataclasses import dataclass
from typing import Dict, Any, List

@dataclass
class RecommendationResult:
    frameworks: List[Dict[str, Any]]
    top_recommendation: Dict[str, Any]
    user_profile: Dict[str, Any]

    def to_dict(self) -> Dict[str, Any]:
        return {
            'frameworks': self.frameworks,
            'top_recommendation': self.top_recommendation,
            'user_profile': self.user_profile
        }