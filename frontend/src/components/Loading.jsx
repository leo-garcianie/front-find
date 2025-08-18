import BgGradient from './BgGradient';

import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#060F0E]">
      <BgGradient />
      <Loader className="size-16 text-white animate-spin" />
    </div>
  );
};

export default Loading;
