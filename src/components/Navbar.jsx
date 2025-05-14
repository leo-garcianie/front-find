'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()

  return (
    <nav className="w-2/3 z-10 top-8 left-1/2 -translate-x-1/2 fixed flex items-center justify-between py-3 px-5 rounded-2xl bg-white/4 backdrop-blur-md border text-[#B4B4B4] border-[#999999]/40">
      <div className="flex items-center gap-3">
        <a href="">
          <div className="bg-[#E6FF79] w-10 h-10 rounded-full"></div>
          {/*
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full bg-white/5 border border-[#999999]/40"
          />
          */}
        </a>

        <span className="font-bold text-[#B4B4B4] text-xl">FrontFind</span>
      </div>

      <button
        className="font-bold text-[#E6FF79] border-1  border-[#E6FF79] px-4 py-2 hover:bg-[#D4FF5B] hover:text-black rounded-md transition-all duration-200 ease-in-out hover:cursor-pointer"
        onClick={() => router.push('/survey')}
      >
        Find
      </button>
    </nav>
  )
}

export default Navbar
