'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SurveyQuestion from '@/components/SurveyQuestion'
import ProgressBar from '@/components/ProgressBar'
import { questions } from '@/lib/data'

export default function Survey() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)

  // Verify that all the questions were answered
  useEffect(() => {
    const questionsAnswered = Object.keys(answers).length === questions.length
    setAllQuestionsAnswered(questionsAnswered)
  }, [answers])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerChange = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  // Save the answers in localStorage to use them in the results page
  const handleSubmit = () => {
    localStorage.setItem('surveyAnswers', JSON.stringify(answers))
    router.push('/')
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#060F0E] relative">
      {/* Floating Circles */}
      <div className="fixed inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="absolute sm:w-[600px] sm:h-[600px] w-[300px] h-[300px] bg-[#00D4FF]/30 rounded-full blur-3xl"></div>
        <div className="absolute sm:w-[400px] sm:h-[400px] w-[150px] h-[150px] bg-[#00D4FF]/40 rounded-full blur-2xl"></div>
        <div className="absolute sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] bg-[#00D4FF]/50 rounded-full blur-xl"></div>
      </div>

      <div className="min-h-screen flex flex-row w-full">
        {/* Left Side */}
        <div className="min-h-screen flex flex-col flex-2 survey-container justify-between px-20">
          {/* Progress Bar */}
          <div className=" flex justify-end">
            <ProgressBar
              currentStep={currentQuestionIndex + 1}
              totalSteps={questions.length}
            />
          </div>

          {/* Question */}
          <span className="font-light text-4xl">
            {currentQuestion.question}
          </span>

          <div className="h-20"></div>
        </div>

        {/* Right Side */}
        <div className="min-h-screen flex flex-col flex-3 survey-container bg-white/4 justify-between px-10 border-l-1 border-[#999999]/40">
          {/* Logo */}
          <div className="flex items-center gap-3 mt-8">
            <div className="bg-[#E6FF79] w-10 h-10 rounded-full"></div>

            <span className="font-bold text-[#B4B4B4] text-xl">FrontFind</span>
          </div>

          {/* Options */}
          <div className="px-25">
            <h1 className="font-bold text-2xl text-[#E6FF79] mb-5">
              Choose an option
            </h1>

            {currentQuestion && (
              <SurveyQuestion
                question={currentQuestion.question}
                options={currentQuestion.options}
                currentAnswer={answers[currentQuestion.id]}
                onAnswerChange={handleAnswerChange}
                multiSelect={currentQuestion.multiSelect}
                maxSelections={currentQuestion.maxSelections || 1}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-end gap-3 mb-8">
            <button
              className="survey-btn rounded-l-full"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                className="survey-btn rounded-r-full"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                Next
              </button>
            ) : (
              <button
                className="survey-btn rounded-r-full"
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
              >
                View results
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
