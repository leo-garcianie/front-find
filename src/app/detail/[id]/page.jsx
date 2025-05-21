'use client'
import Navbar from '@/components/Navbar'
import CircularPercentage from '@/components/charts/CircularPercentage'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { frameworks } from '@/lib/data'

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

      <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 w-2/3">
        {/* 1 */}
        <div className="grid-details col-span-3">
          <div className="flex flex-row items-center gap-4">
            <img
              src={framework.img}
              alt="Logo"
              width={60}
              height={60}
              className='className="drop-shadow-[0_0_8px_rgba(115,233,188,0.3)] rounded-full"'
            />
            <span className="text-2xl font-bold">{framework.name}</span>
          </div>
        </div>

        {/* 2 */}
        <div className="grid-details row-start-2 flex flex-col justify-center items-center">
          <div className="">Grafica 1</div>
        </div>

        {/* 3 */}
        <div className="grid-details col-span-2 row-start-2">Datos Extra</div>

        {/* 4 */}
        <div className="grid-details row-start-3 flex flex-col justify-center items-center">
          Grafica 2
        </div>

        {/* 5 */}
        <div className="grid-details row-start-3 flex flex-col justify-center items-center">
          Grafica 3
        </div>

        {/* 6 */}
        <div className="grid-details row-start-3 flex flex-col justify-center items-center">
          <button className="secondary-btn">Download PDF</button>
        </div>
      </div>
    </main>
  )
}
