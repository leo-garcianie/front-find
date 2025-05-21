import { frameworks } from './data'

export function calculateRecommendations(answers) {
  const scores = {}

  // Inicializar scores
  frameworks.forEach((framework) => {
    scores[framework.id] = 0
  })

  // Pregunta 1
  frameworks.forEach((framework) => {
    const experienceMatch = {
      b: framework.recommended_experience_level === 'beginner' ? 10 : 0,
      i: framework.recommended_experience_level === 'intermediate' ? 10 : 5,
      a: framework.recommended_experience_level === 'advanced' ? 10 : 5,
    }
    scores[framework.id] += experienceMatch[answers[1]] || 0
  })

  // Pregunta 2
  frameworks.forEach((framework) => {
    const projectTypeMap = {
      info: 'landing_page',
      blog: 'blog',
      spa: 'spa',
      mpa: 'mpa',
      dash: 'dashboard',
      ecom: 'ecommerce',
    }

    const projectKey = projectTypeMap[answers[2]]
    if (projectKey && framework.project_compatibility[projectKey]) {
      scores[framework.id] += framework.project_compatibility[projectKey] * 2
    } else {
      scores[framework.id] += 3
    }
  })

  // Pregunta 3
  frameworks.forEach((framework) => {
    const learningCurveMatch = {
      quick: 6 - framework.learning_curve, // Invertir
      complex: framework.learning_curve,
      balance: 5 - Math.abs(3 - framework.learning_curve),
    }
    scores[framework.id] += learningCurveMatch[answers[3]] * 2 || 0
  })

  // Pregunta 4
  frameworks.forEach((framework) => {
    const performanceWeight = {
      cri: 3,
      imp: 2,
      neu: 1,
    }
    scores[framework.id] +=
      framework.performance * (performanceWeight[answers[4]] || 1)
  })

  // Pregunta 5
  frameworks.forEach((framework) => {
    const seoMatch = {
      yes: framework.seo_support >= 4 ? 10 : framework.seo_support >= 3 ? 5 : 0,
      helpful: framework.seo_support >= 3 ? 5 : 0,
      no: 5, // No impact on score
    }
    scores[framework.id] += seoMatch[answers[5]] || 0
  })

  // Pregunta 6
  frameworks.forEach((framework) => {
    const teamSizeMap = {
      solo: 'individual',
      small: 'small_team',
      large: 'large_team',
    }

    const teamKey = teamSizeMap[answers[6]]
    if (teamKey && framework.team_adaptation[teamKey]) {
      scores[framework.id] += framework.team_adaptation[teamKey] * 2
    }
  })

  // Pregunta 7
  frameworks.forEach((framework) => {
    const jsExperienceMatch = {
      b: framework.required_js_experience === 'basic' ? 10 : 5,
      i: framework.required_js_experience === 'intermediate' ? 10 : 5,
      a: framework.required_js_experience === 'advanced' ? 10 : 0,
    }
    scores[framework.id] += jsExperienceMatch[answers[7]] || 0
  })

  // Pregunta 8
  if (answers[8]) {
    const integrations = Array.isArray(answers[8]) ? answers[8] : [answers[8]]

    frameworks.forEach((framework) => {
      integrations.forEach((integration) => {
        const integrationMap = {
          apis: 'rest_api',
          db: 'real_time',
          auth: 'authentication',
          no: 'standalone',
        }

        const integrationKey = integrationMap[integration]
        if (integrationKey && framework.integrations[integrationKey]) {
          scores[framework.id] += 5
        }
      })
    })
  }

  // Pregunta 9
  frameworks.forEach((framework) => {
    const communityWeight = {
      very: 3,
      useful: 2,
      not: 1,
    }
    const weight = communityWeight[answers[9]] || 1
    scores[framework.id] +=
      ((framework.community + framework.documentation) / 2) * weight
  })

  // Pregunta 10
  frameworks.forEach((framework) => {
    const scalabilityWeight = {
      very: 3,
      imp: 2,
      not: 1,
    }
    const weight = scalabilityWeight[answers[10]] || 1
    scores[framework.id] +=
      ((framework.scalability + framework.ease_of_maintenance) / 2) * weight
  })

  // Consideraciones adicionales (bonus si incluye caracteristicas extra)
  frameworks.forEach((framework) => {
    if (framework.mobile_compatibility >= 4) {
      scores[framework.id] += 3
    }

    if (framework.job_market_popularity >= 4) {
      scores[framework.id] += 3
    }

    if (framework.ecosystem >= 4) {
      scores[framework.id] += 3
    }
  })

  const maxPossibleScore = 180

  // Convertir a array
  const results = frameworks.map((framework) => {
    const accuracy = Math.round((scores[framework.id] / maxPossibleScore) * 100)
    return {
      ...framework,
      score: scores[framework.id],
      accuracy: Math.min(accuracy, 98),
    }
  })

  // Ordenar segun puntuación de frameworks
  results.sort((a, b) => b.score - a.score)

  return results
}
