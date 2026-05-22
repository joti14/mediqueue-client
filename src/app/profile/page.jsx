'use client';

import { authClient, signOut } from '@/lib/auth-client';
import { Avatar, Card, Button } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiMail, FiUser, FiCalendar, FiShield, FiLogOut, FiExternalLink, FiCheck } from 'react-icons/fi';
import UpdateProfileModal from '@/components/profile/UpdateProfileModal';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleLogOut = async () => {
        await signOut();
        router.push('/');
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 mt-12 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 h-48 rounded-t-2xl"></div>
                <div className="bg-white dark:bg-[#213145] rounded-b-2xl p-8 sm:p-12 space-y-6">
                    <div className="flex items-center space-x-4 -mt-24">
                        <div className="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full border-4 border-white dark:border-[#213145]"></div>
                        <div className="pt-12 space-y-2">
                            <div className="h-6 w-48 bg-slate-300 dark:bg-slate-700 rounded"></div>
                            <div className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                        <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                        <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 mt-12 text-center">
                <Card className="p-8 bg-white dark:bg-[#213145] border border-[#c3c6d7] dark:border-[#737686] shadow-lg rounded-2xl">
                    <FiShield className="mx-auto text-4xl text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Access Denied
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                        You must be signed in to view your profile dashboard.
                    </p>
                    <Link href="/login" className="w-full">
                        <Button className="w-full bg-[#004ac6] text-white hover:bg-[#2563eb] font-semibold py-2.5 rounded-lg transition">
                            Log In Here
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const joinDate = user.createdAt 
        ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'May 2026';

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 mt-12">
            <Card className="w-full bg-white dark:bg-[#213145] border border-[#c3c6d7] dark:border-[#737686] rounded-2xl shadow-lg overflow-hidden">
                
                <div className="relative h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#004ac6] overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                            Active Session
                        </span>
                    </div>
                </div>

                <div className="relative px-6 sm:px-10 pb-8">
                    
                    <div className="absolute -top-16 left-6 sm:left-10">
                        <Avatar className="h-28 w-28 border-4 border-white dark:border-[#213145] shadow-md bg-white dark:bg-[#1a2736]">
                            <Avatar.Image
                                alt={user?.name}
                                src={user?.image}
                                referrerPolicy="no-referrer"
                                className="object-cover"
                            />
                            <Avatar.Fallback className="bg-[#004ac6] text-white text-2xl font-bold">
                                {user?.name?.charAt(0)}
                            </Avatar.Fallback>
                        </Avatar>
                    </div>

                    <div className="pt-16 sm:pt-14 sm:pl-32 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                                    {user?.name}
                                </h1>
                                <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">
                                    <FiCheck className="text-xs" /> Verified
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-[#004ac6] dark:text-[#dbe1ff] mt-0.5">
                                Student 
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <UpdateProfileModal user={user} />
                            <button
                                onClick={handleLogOut}
                                className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-xs rounded-xl transition duration-150 cursor-pointer"
                            >
                                <FiLogOut className="text-sm" />
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#c3c6d7]/30 dark:border-[#737686]/30"></div>

                <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className="space-y-6">
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
                            Account Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-slate-50 dark:bg-[#1a2736] rounded-xl text-slate-500 dark:text-slate-400 border border-[#c3c6d7]/20">
                                    <FiMail className="text-lg" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        Email
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 break-all">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-slate-50 dark:bg-[#1a2736] rounded-xl text-slate-500 dark:text-slate-400 border border-[#c3c6d7]/20">
                                    <FiUser className="text-lg" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        Full Name
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        {user?.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 bg-slate-50 dark:bg-[#1a2736] rounded-xl text-slate-500 dark:text-slate-400 border border-[#c3c6d7]/20">
                                    <FiCalendar className="text-lg" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        Member Since
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        {joinDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
                            Quick Links & Navigation
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link href="/booked-sessions" className="group">
                                <div className="p-5 h-full rounded-2xl border border-[#c3c6d7]/50 dark:border-[#737686]/40 hover:border-[#004ac6] dark:hover:border-[#dbe1ff] bg-slate-50/50 dark:bg-[#1a2736]/30 hover:bg-slate-50 dark:hover:bg-[#1a2736]/60 transition-all duration-200 flex flex-col justify-between gap-3">
                                    <div>
                                        <p className="text-[10px] font-bold text-[#004ac6] dark:text-[#dbe1ff] uppercase tracking-wider">
                                            My Bookings
                                        </p>
                                        <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#004ac6] dark:group-hover:text-[#dbe1ff] transition-colors">
                                            Booked Sessions
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>Manage slots</span>
                                        <FiExternalLink />
                                    </div>
                                </div>
                            </Link>

                            <Link href="/my-tutors" className="group">
                                <div className="p-5 h-full rounded-2xl border border-[#c3c6d7]/50 dark:border-[#737686]/40 hover:border-[#004ac6] dark:hover:border-[#dbe1ff] bg-slate-50/50 dark:bg-[#1a2736]/30 hover:bg-slate-50 dark:hover:bg-[#1a2736]/60 transition-all duration-200 flex flex-col justify-between gap-3">
                                    <div>
                                        <p className="text-[10px] font-bold text-[#004ac6] dark:text-[#dbe1ff] uppercase tracking-wider">
                                            Mentor Hub
                                        </p>
                                        <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#004ac6] dark:group-hover:text-[#dbe1ff] transition-colors">
                                            My Tutors List
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>Manage classes</span>
                                        <FiExternalLink />
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>

            </Card>
        </div>
    );
};

export default ProfilePage;