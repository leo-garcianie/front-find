import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Navbar from '../components/Navbar';
import BgGradient from '../components/BgGradient';

const Home = () => {
  const logos = [
    {
      src: '/vue.svg',
      alt: 'VueJs Logo',
    },
    {
      src: '/angular.svg',
      alt: 'Angular Logo',
    },
    {
      src: '/nuxt-js.svg',
      alt: 'NuxtJs Logo',
    },
    {
      src: '/react.svg',
      alt: 'React Logo',
    },
    {
      src: '/ember.svg',
      alt: 'Ember Logo',
    },
    {
      src: '/svelte.svg',
      alt: 'Svelte Logo',
    },
    {
      src: '/next-grey.svg',
      alt: 'NextJs Logo',
    },
    {
      src: '/preact.svg',
      alt: 'Preact Logo',
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#060F0E]">
      <Navbar />
      <BgGradient />

      {/* All elements */}
      <div className="z-10 w-full mt-24 space-y-5 text-center">
        {/* Slogan */}
        <p className="max-w-6xl mx-auto py-1 px-2 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Looking for the best
          <br />
          Frontend Framework?
        </p>

        <p className="text-xl md:text-2xl lg:text-3xl font-light text-white">
          Let’s find it...
        </p>

        {/* Start button */}
        <Link to="/survey" className="flex justify-self-center mt-2">
          <p className="primary-btn">Get Started</p>
        </Link>

        {/* Infinite Slider */}
        <div className="flex w-full h-20 md:h-24 lg:h-30 mt-15 items-center justify-center bg-white/4">
          <div className="w-full lg:w-2/3">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={5}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={3000}
              grabCursor={true}
            >
              {logos.map((logo, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="flex size-12 md:size-16 lg:size-20 justify-self-center items-center icons-landing"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
