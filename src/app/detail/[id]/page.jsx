'use client'
import Navbar from '@/components/Navbar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { frameworks } from '@/lib/data'
import CompatibilityChart from '@/components/charts/CompatibilityChart'
import IntegrationsBool from '@/components/charts/IntegrationsBool'

export default function FrameworkDetail({ params }) {
  const router = useRouter()
  const [framework, setFramework] = useState(null)

  useEffect(() => {
    const id = parseInt(params.id)
    const matchedFramework = frameworks.find((f) => f.id === id)

    if (!matchedFramework) {
      router.push('/results')
      return
    }

    setFramework(matchedFramework)
  }, [params.id, router])

  const handleBack = () => {
    router.push('/results')
  }

  if (!framework) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#060F0E] relative">
        <div className="fixed inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="absolute sm:w-[600px] sm:h-[600px] w-[300px] h-[300px] bg-[#00D4FF]/30 rounded-full blur-3xl"></div>
          <div className="absolute sm:w-[400px] sm:h-[400px] w-[150px] h-[150px] bg-[#00D4FF]/40 rounded-full blur-2xl"></div>
          <div className="absolute sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] bg-[#00D4FF]/50 rounded-full blur-xl"></div>
        </div>
        <div className="font-bold justify-center text-6xl">
          Loading details...
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

      <div className="grid grid-cols-3 gap-4 p-4 w-2/3 items-center justify-center mt-12">
        {/* 1 */}
        <div className="flex grid-details col-span-3">
          <div className="flex flex-row items-center justify-center gap-4 w-3/12">
            <img
              src={framework.img}
              alt="Logo"
              width={60}
              height={60}
              className='className="drop-shadow-[0_0_8px_rgba(115,233,188,0.5)] rounded-full"'
            />
            <span className="text-4xl font-bold">{framework.name}</span>
          </div>
          <div className="flex flex-col items-center px-5 py-5 w-9/12 gap-2">
            <div className="flex gap-4">
              <div className="">
                • Experience Level: {framework.recommended_experience_level}
              </div>
              <div className="">
                • Required JS Experience: {framework.required_js_experience}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="">
                • Learning curve: {framework.learning_curve * 2}/10
              </div>
              <div className="">
                • Seo support: {framework.seo_support * 2}/10
              </div>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="grid-details row-start-2 col-span-2 flex flex-col justify-center items-center">
          <div className="mb-2">Compatibility</div>
          <CompatibilityChart
            lan={framework.project_compatibility.landing_page * 2}
            blog={framework.project_compatibility.blog * 2}
            spa={framework.project_compatibility.spa * 2}
            mpa={framework.project_compatibility.mpa * 2}
            dash={framework.project_compatibility.dashboard * 2}
            ecom={framework.project_compatibility.ecommerce * 2}
          />
        </div>

        {/* 3 */}
        <div className="flex flex-col grid-details row-start-2 gap-2 justify-center items-center w-full h-fit text-xl">
          <div>• Performance: {framework.performance * 2}/10</div>
          <div>• Scalability: {framework.scalability * 2}/10</div>
          <div>• Maintainability: {framework.ease_of_maintenance * 2}/10</div>
        </div>

        {/* 4 */}
        <div className="grid-details row-start-3 flex flex-col justify-center items-center">
          <div className="mb-3">Integrations</div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row w-full justify-center items-center gap-2">
              <div className="w-full">Rest API</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool bool={framework.integrations.rest_api} />
              </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center gap-2">
              <div className="w-full">Real Time</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool bool={framework.integrations.real_time} />
              </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center gap-2">
              <div className="w-full">Authentication</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool
                  bool={framework.integrations.authentication}
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center gap-2">
              <div className="w-full">Standalone</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool bool={framework.integrations.standalone} />
              </div>
            </div>
          </div>
        </div>

        {/* 5 */}
        <div className="grid-details row-start-3 col-start-2 flex flex-col justify-center items-center">
          <a
            href={framework.documentation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1 text-[#E6FF79] underline text-xl items-center"
          >
            <img src="/icons/link.svg" width={30} />
            Visit Docs
          </a>
        </div>

        {/* 6 */}
        <div className="grid-details row-start-3 flex flex-col justify-center items-center">
          <button className="flex flex-col items-center secondary-btn gap-1 p-2">
            <img src="/icons/doc.svg" height={35} width={35} />
            Download PDF
          </button>
        </div>
      </div>
    </main>
  )
}
