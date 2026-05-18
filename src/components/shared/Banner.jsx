"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayTimer = useRef(null);

  const slides = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA44lhThftEwy_9vCipHZzw-sg47cpyULigVcJ8RSFwFE_a1WH8oHvMiDhw2huWiEdpKXXZ4vn77CdOp8iLqX0XpkqNoeoK80MqdjPevFYSy2aQySSHdmqItCEO_NaY-C9GKkC2ivGlxcokwutZZgyy2brQjJfjSoLqafftX2gy-tO8rqOeoe4WVhcyua-e9pEDwSUZX1yTMUqMO-9DmkmNWrQTM42croUoD9Zpm7b6n6VzIXnlyecsmfsPz3VPLrQJVDVPJCwdFRA",
      tagline: "Medical Excellence",
      title: "Master Your Medical Curriculum with Expert Guidance.",
      description: "Access elite tutors from top medical institutions around the world. Tailored one-on-one sessions for academic success.",
      cta: "Find a Tutor",
    },
    {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200",
      tagline: "Advanced Simulation",
      title: "Bridge the Gap Between Clinical Theory and Practice.",
      description: "Interactive clinical simulations, customized USMLE preparatory paths, and practical case studies tailored to your speed.",
      cta: "Explore Programs",
    },
    {
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1200",
      tagline: "Global Network",
      title: "Learn Directly from the Brightest Minds Globally.",
      description: "Join interactive peer study blocks or schedule custom one-on-one instruction with resident tutors from Oxford and Harvard.",
      cta: "Join Study Groups",
    }
  ];

  // Start Autoplay transition
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  // Stop Autoplay transition
  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  // Initialize and clean up autoplay
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <section 
      className="relative w-full h-[520px] md:h-[620px] overflow-hidden bg-[#0b1c30]"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Slide Background Image with subtle cinematic zoom when active */}
              <div 
                className={`absolute inset-0 w-full h-full transition-transform duration-10000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dark Gradient Overlay matching original 'on-background' hex code (#0b1c30) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/90 via-[#0b1c30]/65 to-transparent"></div>

              {/* Slide Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-[16px] md:px-[64px] max-w-[1280px] mx-auto text-white">
                <span 
                  className={`font-['Inter',sans-serif] font-semibold text-[14px] uppercase tracking-widest text-[#dbe1ff] mb-[12px] transition-all duration-700 delay-100 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                >
                  {slide.tagline}
                </span>
                
                <h2 
                  className={`font-headline text-[32px] md:text-[48px] font-bold leading-tight max-w-2xl mb-[24px] transition-all duration-700 delay-200 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                >
                  {slide.title}
                </h2>
                
                <p 
                  className={`font-['Inter',sans-serif] text-[16px] md:text-[18px] leading-relaxed max-w-xl mb-[32px] opacity-90 transition-all duration-700 delay-300 ${
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
                  <button className="px-[40px] py-[14px] bg-[#004ac6] text-white rounded-lg text-[14px] font-semibold hover:bg-[#2563eb] active:scale-95 transition-all duration-150 shadow-xl shadow-[#004ac6]/20">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Control Dots */}
      <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 flex gap-[12px] z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSlide(index);
              startAutoplay(); // Reset timer on interaction
            }}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
              index === activeSlide 
                ? "w-12 bg-white" 
                : "w-6 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
