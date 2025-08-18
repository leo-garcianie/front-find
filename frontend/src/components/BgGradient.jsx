const BgGradient = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center opacity-10 pointer-events-none">
      <div className="absolute w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-[#00D4FF]/30 rounded-full blur-3xl"></div>
      <div className="absolute w-[150px] h-[150px] sm:w-[400px] sm:h-[400px] bg-[#00D4FF]/40 rounded-full blur-2xl"></div>
      <div className="absolute w-[100px] h-[100px] sm:w-[300px] sm:h-[300px] bg-[#00D4FF]/50 rounded-full blur-xl"></div>
    </div>
  );
};

export default BgGradient;
