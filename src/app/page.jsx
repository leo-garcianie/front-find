'use client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#060F0E] relative">
      <Navbar />
      {/* Floating Circles */}
      <div className="fixed inset-0 flex items-center justify-center opacity-10">
        <div className="absolute sm:w-[600px] sm:h-[600px] w-[300px] h-[300px] bg-[#00D4FF]/30 rounded-full blur-3xl"></div>
        <div className="absolute sm:w-[400px] sm:h-[400px] w-[150px] h-[150px] bg-[#00D4FF]/40 rounded-full blur-2xl"></div>
        <div className="absolute sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] bg-[#00D4FF]/50 rounded-full blur-xl"></div>
      </div>

      {/* Centered Text and Button */}
      <div className="text-center space-y-5 z-10 mt-20 w-full">
        <p className="w-2/3 mx-auto py-1 px-2 font-bold text-5xl text-white">
          Looking for the best
          <br />
          Frontend Framework?
        </p>

        <p className="font-light text-3xl text-white">Let’s find it...</p>

        <button
          className="font-bold text-black bg-[#E6FF79] px-4 py-2 rounded-md transition-all duration-200 ease-in-out mt-2 hover:cursor-pointer hover:scale-105"
          onClick={() => router.push('/survey')}
        >
          Get Started
        </button>

        <div className="flex items-center justify-center w-full h-30 mt-15 bg-white/4 gap-23">
          <img className="icons-landing" src="./vuejs.webp" alt="VueJs Logo" />
          <img
            className="icons-landing"
            src="./angular.webp"
            alt="Angular Logo"
          />
          <img className="icons-landing" src="./react.webp" alt="React Logo" />
          <img
            className="icons-landing"
            src="./jquery.webp"
            alt="jQuery Logo"
          />
          <img
            className="icons-landing"
            src="./svelte.webp"
            alt="Svelte Logo"
          />
        </div>
      </div>
    </div>
  )
}
