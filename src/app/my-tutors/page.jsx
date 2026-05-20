import MyTutorCard from '@/components/myTutor/MyTutorCard';
import React from 'react';

const MyTutorListPage = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const res = await fetch(`${apiUrl}/my-tutors`, {
        cache: "no-store",
    });
    const tutors = await res.json();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">

            <div className="mb-10 text-center md:text-left max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
                    My Tutors
                </h1>
                {/* <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                    Expert-led sessions for medical students. From Gross Anatomy to USMLE Step 1 preparation,
                    find the right tutor to accelerate your learning.
                </p> */}
            </div>

            <div className="">
                {tutors?.map((tutor) => (
                    <MyTutorCard key={tutor._id} tutor={tutor} />
                ))}
            </div>
        </div>
    );
};

export default MyTutorListPage;