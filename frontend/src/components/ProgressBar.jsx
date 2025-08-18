const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="flex flex-col items-center w-fit gap-1">
      <div className="text-base lg:text-lg font-bold text-right text-[#B4B4B4]">
        {currentStep} - {totalSteps}
      </div>

      <div className="w-full h-1 overflow-hidden bg-[#e5e7eb]/40 rounded-full">
        <div
          className="h-full bg-[#E6FF79] transition-all duration-75 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
