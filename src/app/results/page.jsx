'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import CircularPercentage from '@/components/CircularPercentage'
import { calculateRecommendations } from '@/lib/algorithm'

export default function Results() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const { pascalCase } = require('change-case')

  useEffect(() => {
    const storedAnswers = localStorage.getItem('surveyAnswers')

    if (!storedAnswers) {
      router.push('/survey')
      return
    }

    const answers = JSON.parse(storedAnswers)
    const results = calculateRecommendations(answers)
    setRecommendations(results)
    setLoading(false)
  }, [router])

  const handleViewDetails = (id) => {
    router.push(`/detail/${id}`)
  }

  const handleRestartSurvey = () => {
    router.push('/survey')
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#060F0E] relative">
        <div className="fixed inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="absolute sm:w-[600px] sm:h-[600px] w-[300px] h-[300px] bg-[#00D4FF]/30 rounded-full blur-3xl"></div>
          <div className="absolute sm:w-[400px] sm:h-[400px] w-[150px] h-[150px] bg-[#00D4FF]/40 rounded-full blur-2xl"></div>
          <div className="absolute sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] bg-[#00D4FF]/50 rounded-full blur-xl"></div>
        </div>
        <div className="font-bold justify-center text-6xl">
          Loading results...
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#060F0E] relative">
      <Navbar />
      {/* Floating Circles */}
      <div className="fixed inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="absolute sm:w-[600px] sm:h-[600px] w-[300px] h-[300px] bg-[#00D4FF]/30 rounded-full blur-3xl"></div>
        <div className="absolute sm:w-[400px] sm:h-[400px] w-[150px] h-[150px] bg-[#00D4FF]/40 rounded-full blur-2xl"></div>
        <div className="absolute sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] bg-[#00D4FF]/50 rounded-full blur-xl"></div>
      </div>

      {/* Content */}
      <div className="w-full px-8 md:px-6 sm:px-3 mt-24 mb-8">
        {/* Title */}
        <div className="text-center w-full mb-8">
          <p className="mx-auto font-bold text-4xl text-white px-12">
            Here’re your top 3 frameworks
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 px-12 max-w-screen-lg align-center mx-auto">
          {recommendations.slice(0, 3).map((framework, index) => (
            <div key={framework.id}>
              <div className="border border-[#999999]/40 rounded-4xl px-8 py-6 flex flex-col justify-center bg-white/4">
                {/* Name */}
                <div>
                  <img src="" alt="" />
                  <h2 className="font-bold text-xl mb-2">{framework.nombre}</h2>
                </div>

                {/* Level */}
                <span className="text-sm text-white/70">
                  Level: {pascalCase(framework.nivel_experiencia_recomendado)}
                </span>

                {/* Percentage */}
                <div className="flex flex-col justify-center items-center my-5">
                  <CircularPercentage percentage={framework.accuracy} />
                  <div className="text-2xl font-bold">
                    {framework.accuracy}%
                  </div>
                </div>

                {/* Details Button */}
                <button className="secondary-btn">Details</button>
              </div>

              {/* No# */}
              <div className="safe text-4xl font-bold justify-self-center mt-5">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-2 mt-8">
          <button className="primary-btn" onClick={handleRestartSurvey}>
            Restart
          </button>
          <button className="primary-btn">PDF</button>
        </div>
      </div>
    </main>
  )
}
