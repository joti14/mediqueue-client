"use client";

import { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200",
      tagline: "Medical Excellence",
      title: "Master Your Medical Curriculum with Expert Guidance",
      description: "Access elite tutors from top medical institutions around the world. Tailored one-on-one sessions designed to help you excel in clinical practice and board exams.",
      cta: "Find a Tutor",
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
      tagline: "Personalized Mentorship",
      title: "Unlock Your Potential with Certified Instructors",
      description: "Connect with verified educators in science, mathematics, language, and coding. Learn at your own pace with interactive study plans tailored to you.",
      cta: "Explore Tutors",
    },
    {
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1200",
      tagline: "Interactive Study Network",
      title: "Learn Directly from the Brightest Minds Globally",
      description: "Schedule custom instructions or join interactive peer study sessions with expert tutors from top-ranking global universities.",
      cta: "Start Learning Now",
    }
  ];

  return (
    <section className="group relative w-full h-[520px] md:h-[620px] overflow-hidden bg-[#0b1c30]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        navigation={{
          prevEl: ".custom-swiper-button-prev",
          nextEl: ".custom-swiper-button-next",
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <SwiperSlide key={index} className="relative h-full w-full">
              {/* Slide Background Image with subtle cinematic zoom when active */}
              <div 
                className={`absolute inset-0 w-full h-full transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dark Gradient Overlay for maximum text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/95 via-[#0b1c30]/75 to-transparent"></div>

              {/* Slide Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-[16px] md:px-[64px] max-w-[1280px] mx-auto text-white">
                <span 
                  className={`font-sans font-semibold text-[14px] uppercase tracking-widest text-[#89f5e7] mb-[12px] transition-all duration-700 delay-100 block ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                >
                  {slide.tagline}
                </span>
                
                <h2 
                  className={`font-headline text-[32px] md:text-[52px] font-bold leading-tight max-w-3xl mb-[20px] transition-all duration-700 delay-200 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                >
                  {slide.title}
                </h2>
                
                <p 
                  className={`font-sans text-[16px] md:text-[18px] leading-relaxed max-w-2xl mb-[36px] text-slate-300 transition-all duration-700 delay-300 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                >
                  {slide.description}
                </p>
                
                <div 
                  className={`transition-all duration-700 delay-400 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                >
                  <Link href="/tutors">
                    <button className="px-[36px] py-[14px] bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg text-[14px] font-semibold active:scale-95 transition-all duration-150 shadow-xl shadow-[#004ac6]/30 cursor-pointer">
                      {slide.cta}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="custom-swiper-button-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center border border-white/20 backdrop-blur-md transition-all text-white hover:text-[#89f5e7] opacity-0 group-hover:opacity-100 cursor-pointer">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="custom-swiper-button-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center border border-white/20 backdrop-blur-md transition-all text-white hover:text-[#89f5e7] opacity-0 group-hover:opacity-100 cursor-pointer">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Custom Pagination Container */}
      <div className="custom-swiper-pagination absolute bottom-[32px] left-1/2 -translate-x-1/2 z-20 flex gap-[8px]"></div>
    </section>
  );
}
