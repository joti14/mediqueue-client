import Link from "next/link";
import { FiHome, FiSearch, FiBook, FiUsers, FiCalendar, FiUser, FiMapPin } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">

        {/* 404 graphic */}
        <div className="relative inline-block mb-10">
          <div className="text-[130px] font-extrabold leading-none tracking-tighter text-slate-100 dark:text-slate-800 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-[#1a2736] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
              <FiMapPin className="text-[#004ac6] dark:text-[#93b4ff] text-lg" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Page not found
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
          Looks like you got lost
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Primary actions */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white font-semibold text-sm rounded-xl transition-all duration-150 shadow-md"
          >
            <FiHome className="text-base" />
            Back to home
          </Link>
          <Link
            href="/tutors"
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#1a2736] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-xl transition hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <FiSearch className="text-base" />
            Find tutors
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-widest">
            Or jump to
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { href: "/courses", icon: <FiBook />, label: "Courses" },
              { href: "/tutors", icon: <FiUsers />, label: "Tutors" },
              { href: "/bookings", icon: <FiCalendar />, label: "Bookings" },
              { href: "/profile", icon: <FiUser />, label: "Profile" },
            ].map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-[#004ac6] dark:text-[#93b4ff] text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}   