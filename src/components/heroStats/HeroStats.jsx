'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);
    const elementRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime = null;
                    const step = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(ease * end));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.1 }
        );

        const el = elementRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [end, duration]);

    return { count, ref: elementRef };
};

const StatCounter = ({ value, label }) => {
    const { count, ref } = useCountUp(value);
    return (
        <div ref={ref}>
            <div className="text-2xl md:text-3xl font-extrabold text-[#004ac6] dark:text-[#93b4ff]">
                {count.toLocaleString()}+
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
        </div>
    );
};

export default function HeroStats() {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-6 items-center">

                <div className="relative h-80 md:h-[520px] rounded-2xl overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Student learning online"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="bg-white dark:bg-[#1a2736] border border-slate-200 dark:border-slate-700 rounded-2xl p-8 md:p-10">
                    <p className="text-sm font-semibold text-[#004ac6] dark:text-[#93b4ff] uppercase tracking-widest mb-3">
                        Find Best
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight mb-6">
                        Tutors Anywhere
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8">
                        Connect with expert tutors passionate about helping you succeed. Whether you're
                        mastering anatomy, preparing for USMLE, or building clinical skills — get
                        personalized guidance tailored to your goals.
                    </p>

                    <div className="grid grid-cols-3 gap-4 py-7 border-y border-slate-100 dark:border-slate-700">
                        <StatCounter value={50000} label="Great Tutors" />
                        <StatCounter value={52100} label="Clever Students" />
                        <StatCounter value={3900} label="World's Cities" />
                    </div>

                    <div className="mt-8">
                        <a
                            href="/tutors"
                            className="inline-block bg-[#004ac6] hover:bg-[#2563eb] text-white font-semibold text-sm py-3 px-7 rounded-xl transition-all duration-150 shadow-md"
                        >
                            Start Learning Today
                        </a>
                    </div>
            </div>

        </div>
    </section >
  );
}