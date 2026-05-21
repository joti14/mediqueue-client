"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  { name: "Sarah Kim", role: "USMLE Step 1 student", initials: "SK", text: "The tutors here completely changed how I approach anatomy. Dr. Jenkins broke down complex structures in ways that finally made sense after months of struggle." },
  { name: "James Okonkwo", role: "2nd year med student", initials: "JO", text: "I went from barely passing physiology exams to scoring in the top 15% of my class. The one-on-one sessions are incredibly focused and efficient." },
  { name: "Priya Sharma", role: "Pre-clinical student", initials: "PS", text: "Finding a tutor who specializes in biochemistry and explains clinical relevance was a game changer. Worth every single session." },
  { name: "Michael Torres", role: "USMLE Step 2 student", initials: "MT", text: "Booked 6 sessions before my shelf exams and passed all of them. Tutors understand exactly what students need and adapt their teaching on the fly." },
  { name: "Aisha Patel", role: "3rd year med student", initials: "AP", text: "I was overwhelmed during third year rotations. My tutor helped me build a study system that worked around my hospital schedule. Highly recommend." },
  { name: "Lucas Fernandez", role: "1st year med student", initials: "LF", text: "Started struggling with histology early on. The visual explanations and mnemonics my tutor shared stuck with me through the entire semester." },
  { name: "Emily Chen", role: "USMLE Step 1 student", initials: "EC", text: "My score jumped 18 points after just three weeks of targeted tutoring. The personalized approach made all the difference." },
];

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200",
  "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200",
  "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
  "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
];

function useVisible() {
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const visible = useVisible();
  const maxIndex = testimonials.length - visible;
  const autoRef = useRef(null);

  const goTo = useCallback((i) => {
    setCurrent(Math.max(0, Math.min(i, maxIndex)));
  }, [maxIndex]);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
  }, [maxIndex]);

  const stopAuto = () => clearInterval(autoRef.current);

  // clamp current if visible count changes on resize
  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
          What students are saying
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Real experiences from medical students across the platform.
        </p>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current} * (100% / ${visible})))` }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / visible}%` }}
            >
              <div className="h-full bg-white dark:bg-[#1a2736] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col">
                <div className="text-amber-400 text-sm mb-3">{"★".repeat(5)}</div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <FiChevronLeft />
        </button>

        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 bg-slate-800 dark:bg-slate-100"
                : "w-2 bg-slate-300 dark:bg-slate-600"
            }`}
          />
        ))}

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === maxIndex}
          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}