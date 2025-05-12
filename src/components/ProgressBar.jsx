export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="flex flex-col items-center gap-1 mt-10 w-fit">
      <div className="text-[#B4B4B4] text-right font-bold text-lg">
        {currentStep} - {totalSteps}
      </div>

      <div className="w-full h-1 bg-[#e5e7eb]/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#E6FF79] transition-all duration-75 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
