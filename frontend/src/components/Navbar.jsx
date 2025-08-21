import { Link } from 'react-router';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="flex w-full justify-center">
      <nav className="fixed left-1/2 top-0 lg:top-8 z-10 -translate-x-1/2 flex w-full max-w-6xl items-center justify-between py-3 px-5 text-[#B4B4B4] bg-white/4 backdrop-blur-md border border-[#999999]/40 rounded-none lg:rounded-2xl">
        <Link to="/" className="flex items-center gap-3">
          <img src='/frontfind-logo.svg' alt='FrontFind Logo' className='size-10'/>
          <span className="text-base lg:text-xl font-bold text-[#B4B4B4]">
            FrontFind
          </span>
        </Link>

        <Link to="/survey" className="green-btn">
          <p className="text-sm md:text-base lg:text-base font-medium">Find</p>
          <Activity className="size-5" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
