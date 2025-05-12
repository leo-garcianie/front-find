'use client'
import { useState, useEffect } from 'react'

export default function SurveyQuestion({
  question,
  options,
  currentAnswer,
  onAnswerChange,
  multiSelect = false,
  maxSelections = 1,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    currentAnswer
      ? Array.isArray(currentAnswer)
        ? currentAnswer
        : [currentAnswer]
      : []
  )

  useEffect(() => {
    if (currentAnswer) {
      setSelectedOptions(
        Array.isArray(currentAnswer) ? currentAnswer : [currentAnswer]
      )
    } else {
      setSelectedOptions([])
    }
  }, [currentAnswer])

  const handleOptionSelect = (optionId) => {
    let newSelected

    if (multiSelect) {
      if (selectedOptions.includes(optionId)) {
        // Deseleccionar si ya está seleccionado
        newSelected = selectedOptions.filter((id) => id !== optionId)
      } else {
        // Verificar límite de selecciones
        if (selectedOptions.length < maxSelections) {
          newSelected = [...selectedOptions, optionId]
        } else {
          // Reemplazar la primera selección con la nueva
          newSelected = [...selectedOptions.slice(1), optionId]
        }
      }
    } else {
      // Opción única
      newSelected = [optionId]
    }

    setSelectedOptions(newSelected)
    onAnswerChange(multiSelect ? newSelected : optionId)
  }

  return (
    <div>
      {/*<h3 className="text-2xl font-bold mb-4">{question}</h3>*/}
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            className={`px-3 py-1.5 rounded-full text-left text-white text-lg hover:bg-[#f3f4f6]/8 hover:cursor-pointer ${
              selectedOptions.includes(option.id)
                ? 'text-black border border-[#E6FF79]'
                : 'border border-transparent'
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}
