import { Suspense } from "react";
import TutorCard from "@/components/tutor/TutorCard";
import TutorSearchBar from "@/components/tutors/TutorSearchBar";
import TutorDateFilter from "@/components/tutors/TutorDateFilter";
import { fetchTutors } from "@/lib/tutors/data";

export const metadata = {
  title: "Find Your Academic Mentor | MediQueue",
  description: "Browse and filter expert medical tutors by availability, experience, and specialization. Schedule sessions today.",
};

const TutorsPage = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;
    const tutors = await fetchTutors(resolvedSearchParams);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">

            <div className="mb-10 text-center md:text-left max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
                    Find Your Academic Mentor
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                    Expert-led sessions for medical students. From Gross Anatomy to USMLE Step 1 preparation,
                    find the right tutor to accelerate your learning.
                </p>
            </div>

            <div className="my-10 bg-white dark:bg-[#213145] border border-[#c3c6d7] dark:border-[#737686] rounded-xl px-5 py-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-end gap-6 mb-8">
                <Suspense fallback={<div className="h-10 w-full animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg"></div>}>
                    <TutorSearchBar />
                </Suspense>
                
                <Suspense fallback={<div className="h-10 w-full animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg"></div>}>
                    <TutorDateFilter />
                </Suspense>
            </div>

            {tutors && tutors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutors.map((tutor) => (
                        <TutorCard key={tutor._id} tutor={tutor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 dark:bg-[#1a2736]/30 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                        No tutors found matching your search or date criteria.
                    </p>
                </div>
            )}
        </div>
    );
};

export default TutorsPage;
