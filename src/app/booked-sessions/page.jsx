import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiCalendar, FiSearch } from 'react-icons/fi';
import BookedSessionsTable from '@/components/bookedSessions/BookedSessionsTable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata = {
  title: "Booked Sessions | MediQueue",
  description: "View and manage all your booked tutoring sessions. Track upcoming appointments and session details.",
};

const MyBookedSessions = async () => {
    let bookings = [];
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/my-tutors`, {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            bookings = await res.json();
        }
    } catch (error) {
        console.error("Error fetching booked sessions:", error);
    }

    const hasBookings = Array.isArray(bookings) && bookings.length > 0;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
                    My Booked Sessions
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
                    Manage your registered medical courses and track your learning journey.
                </p>
            </div>
            {hasBookings ? (
                <BookedSessionsTable bookings={bookings} />
            ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 md:p-16 text-center max-w-2xl mx-auto">
                    <div className="mx-auto w-20 h-20 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                        <FiCalendar className="text-4xl" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
                        No Booked Sessions Yet
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base mb-8">
                        You haven't booked any sessions yet. Start your learning journey by exploring our expert tutors.
                    </p>
                    <Link href="/tutors">
                        <Button
                            size="lg"
                            className="bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold rounded-xl px-8 py-6"
                        >
                            <FiSearch className="mr-2" />
                            Browse Tutors
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
export default MyBookedSessions;