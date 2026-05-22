import MyTutorsTable from '@/components/myTutor/MyTutorsTable';
import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiCalendar, FiSearch } from 'react-icons/fi';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "My Tutors | MediQueue",
  description: "Manage and view your booked tutors. Schedule sessions, view profiles, and track your learning progress.",
};

const MyTutorListPage = async () => {
    let tutors = [];
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect('/login');
    }

    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const userEmail = session?.user?.email;

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/my-tutors`, {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            const allData = await res.json();
            tutors = allData.filter(
                t => t.experience && t.description && (!t.userEmail || t.userEmail === userEmail)
            );
        }
    } catch (error) {
        console.error("Error fetching booked tutors:", error);
    }

    const hasTutors = Array.isArray(tutors) && tutors.length > 0;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="mb-10 text-center md:text-left max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
                    My Tutors
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    View and manage your active academic connections, review lesson schedules, and keep track of your tutoring network.
                </p>
            </div>

            {/* List or Empty State */}
            {hasTutors ? (
                <MyTutorsTable tutors={tutors} />
            ) : (
                /* Premium and Friendly Empty State Card */
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-16 text-center max-w-2xl mx-auto shadow-sm mt-8">
                    <div className="mx-auto w-20 h-20 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                        <FiCalendar className="text-3xl" />
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
                        No Booked Tutors Yet
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
                        It looks like you haven't booked any academic sessions yet. Connect with our expert medical tutors to accelerate your gross anatomy, biochemistry, pathology, or USMLE board preparation!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/tutors">
                            <Button
                                size="lg"
                                className="bg-[#004ac6] text-white hover:bg-[#2563eb] font-bold text-sm rounded-xl px-8 shadow-md flex items-center gap-2"
                            >
                                <FiSearch className="text-base" />
                                Explore Tutors
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTutorListPage;