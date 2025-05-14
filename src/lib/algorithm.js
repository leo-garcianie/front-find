import { frameworks } from './data'

export function calculateRecommendations(answers) {
  const scores = {}

  // Inicializar puntuaciones
  frameworks.forEach((framework) => {
    scores[framework.id] = 0
  })

  // Pregunta 1: Nivel de experiencia
  frameworks.forEach((framework) => {
    const experienceMatch = {
      p: framework.nivel_experiencia_recomendado === 'principiante' ? 10 : 0,
      i: framework.nivel_experiencia_recomendado === 'intermedio' ? 10 : 5,
      a: framework.nivel_experiencia_recomendado === 'avanzado' ? 10 : 5,
    }
    scores[framework.id] += experienceMatch[answers[1]] || 0
  })

  // Pregunta 2: Tipo de aplicación
  frameworks.forEach((framework) => {
    const projectTypeMap = {
      info: 'sitio_informativo',
      ecom: 'ecommerce',
      spa: 'spa',
      dash: 'dashboard',
      traf: 'alto_trafico',
    }

    const projectKey = projectTypeMap[answers[2]]
    if (projectKey && framework.compatibilidad_proyecto[projectKey]) {
      scores[framework.id] += framework.compatibilidad_proyecto[projectKey] * 2
    } else {
      // Para MPA y otros tipos no específicos, dar un puntaje medio
      scores[framework.id] += 3
    }
  })

  // Pregunta 3: Curva de aprendizaje
  frameworks.forEach((framework) => {
    const learningCurveMatch = {
      rapido: 6 - framework.curva_aprendizaje, // Invierte la escala para que menor sea mejor
      complejo: framework.curva_aprendizaje,
      balance: 5 - Math.abs(3 - framework.curva_aprendizaje), // 3 es el valor medio ideal para balance
    }
    scores[framework.id] += learningCurveMatch[answers[3]] * 2 || 0
  })

  // Pregunta 4: Rendimiento
  frameworks.forEach((framework) => {
    const performanceWeight = {
      muy: 3,
      imp: 2,
      neu: 1,
    }
    scores[framework.id] +=
      framework.rendimiento * (performanceWeight[answers[4]] || 1)
  })

  // Pregunta 5: Soporte SSR
  frameworks.forEach((framework) => {
    const ssrMatch = {
      si:
        framework.soporte_ssr === 2 ? 10 : framework.soporte_ssr === 1 ? 5 : 0,
      util: framework.soporte_ssr >= 1 ? 5 : 0,
      no: 5, // No afecta la puntuación
      ns: 3, // Valor neutral
    }
    scores[framework.id] += ssrMatch[answers[5]] || 0
  })

  // Pregunta 6: Desarrollo móvil
  frameworks.forEach((framework) => {
    if (answers[6] === 'si') {
      scores[framework.id] += framework.compatibilidad_movil * 2
    }
  })

  // Pregunta 7: Tamaño del equipo
  frameworks.forEach((framework) => {
    const teamSizeMap = {
      solo: 'individual',
      peq: 'equipo_pequeño',
      grande: 'equipo_grande',
    }

    const teamKey = teamSizeMap[answers[7]]
    if (teamKey && framework.adaptacion_equipo[teamKey]) {
      scores[framework.id] += framework.adaptacion_equipo[teamKey] * 2
    }
  })

  // Pregunta 8: Tipo de ecosistema
  frameworks.forEach((framework) => {
    const ecosystemMatch = {
      comp: 6 - framework.flexibilidad_estructura, // Invierte para que menos flexible sea mejor para "completo"
      flex: framework.flexibilidad_estructura,
      bal: 5 - Math.abs(3 - framework.flexibilidad_estructura), // 3 es el valor medio ideal para balance
    }
    scores[framework.id] += ecosystemMatch[answers[8]] * 1.5 || 0
  })

  // Pregunta 9: Características prioritarias
  if (answers[9]) {
    const priorities = Array.isArray(answers[9]) ? answers[9] : [answers[9]]

    frameworks.forEach((framework) => {
      priorities.forEach((priority) => {
        const priorityMap = {
          facil: 'facilidad_uso',
          rend: 'rendimiento',
          escala: 'escalabilidad',
          pop: 'popularidad_laboral',
          eco: 'ecosistema',
        }

        const priorityKey = priorityMap[priority]
        if (priorityKey && framework.caracteristicas[priorityKey]) {
          scores[framework.id] += framework.caracteristicas[priorityKey] * 3
        }
      })
    })
  }

  // Pregunta 10: Restricciones tecnológicas
  frameworks.forEach((framework) => {
    const restrictionMap = {
      nav: 'navegadores_antiguos',
      bundle: 'bundle_pequeño',
      carga: 'carga_rapida',
      acc: 'accesibilidad',
      seo: 'seo',
    }

    const restrictionKey = restrictionMap[answers[10]]
    if (
      restrictionKey &&
      framework.compatibilidad_restricciones[restrictionKey]
    ) {
      scores[framework.id] +=
        framework.compatibilidad_restricciones[restrictionKey] * 2.5
    } else if (answers[10] === 'none') {
      // Sin restricciones, pequeño bonus
      scores[framework.id] += 5
    }
  })

  // Normalizar las puntuaciones y calcular precisión
  const maxPossibleScore = 175 // Puntaje máximo teórico basado en pesos

  // Convertir a array para ordenar
  const results = frameworks.map((framework) => {
    const accuracy = Math.round((scores[framework.id] / maxPossibleScore) * 100)
    return {
      ...framework,
      score: scores[framework.id],
      accuracy: Math.min(accuracy, 98), // Cap en 98% para mostrar que no hay solución perfecta
    }
  })

  // Ordenar por puntuación de mayor a menor
  results.sort((a, b) => b.score - a.score)

  return results
}
