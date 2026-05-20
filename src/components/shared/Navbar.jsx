"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardPlus } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  // console.log(session)

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await signOut();
    router.push('/');
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Tutors", href: "/tutors" },
    { label: "Add Tutors", href: "/add-tutors" },
    { label: "My Tutors List", href: "/my-tutors" },
    { label: "My Booked Sessions", href: "/booked-sessions" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 border-b transition-all duration-300 ${scrolled
        ? "border-[#c3c6d7]/50 bg-[#f8f9ff]/85 backdrop-blur-md shadow-md dark:border-[#737686]/50 dark:bg-[#213145]/85"
        : "border-[#c3c6d7] bg-[#f8f9ff] shadow-sm dark:border-[#737686] dark:bg-[#213145] dark:shadow-none"
        }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-[16px] md:px-[40px]">

        <Link href="/" className="flex items-center gap-[12px] group focus:outline-none">
          <span className="text-[#004ac6] transition-transform duration-300 group-hover:scale-105 dark:text-[#dbe1ff]">
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-10-2h4v2h-4V4zm10 15H4V8h16v11zm-9-2h2v-3h3v-2h-3V9H11v3H8v2h3v3z" />
            </svg>
            {/* <ClipboardPlus /> */}
          </span>
          <h1 className="font-headline text-2xl font-bold text-[#004ac6] transition-colors duration-300 dark:text-[#dbe1ff]">
            MediQueue
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-[24px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-all duration-200 pb-1 text-[16px] ${isActive
                  ? "text-[#004ac6] dark:text-[#dbe1ff] font-bold border-b-2 border-[#004ac6] dark:border-[#dbe1ff]"
                  : "text-[#434655] dark:text-[#d3e4fe] font-medium hover:text-[#004ac6] dark:hover:text-[#dbe1ff]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-[16px]">
          {!isPending && !session ? (
            <>
              <Link
                href="/login"
                className="font-medium text-[#434655] hover:text-[#004ac6] dark:text-[#d3e4fe] dark:hover:text-[#dbe1ff] transition-colors"
              >
                Login
              </Link>
              <Link href="/register">
                <button className="bg-[#004ac6] text-white font-bold rounded-full px-6 py-2.5 shadow-lg shadow-[#004ac6]/10 hover:opacity-95 active:scale-95 transition-all duration-150">
                  Join Free
                </button>
              </Link>
            </>
          ) : (
            <div className="relative group py-2">
              <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-[#d3e4fe]/25 dark:hover:bg-[#737686]/20 transition-all duration-200 border border-transparent">
                <Image
                  width={40}
                  height={40}
                  src={session?.user?.image || "/default-avatar.png"}
                  alt={session?.user?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#004ac6]/20 dark:ring-[#dbe1ff]/20"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold text-[#0b1c30] dark:text-[#f8f9ff] truncate max-w-[100px]">
                    {session?.user?.name}
                  </p>
                  <p className="text-[10px] text-[#434655] dark:text-[#d3e4fe]">Student</p>
                </div>
              </button>

              <div className="absolute right-0 top-14 w-56 bg-[#f8f9ff] dark:bg-[#213145] border border-[#c3c6d7]/30 dark:border-[#737686]/30 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#c3c6d7]/20">
                  <p className="font-bold text-sm text-[#0b1c30] dark:text-[#f8f9ff]">Welcome back!</p>
                  <p className="text-xs truncate text-[#434655] dark:text-[#d3e4fe]">{session?.user?.email}</p>
                </div>

                <Link href="/dashboard" className="px-4 py-2.5 text-sm text-[#434655] dark:text-[#d3e4fe] hover:bg-[#004ac6]/5 dark:hover:bg-[#004ac6]/10 hover:text-[#004ac6] dark:hover:text-[#dbe1ff] flex items-center gap-3 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 14a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                  </svg>
                  Dashboard
                </Link>

                <Link href="/settings" className="px-4 py-2.5 text-sm text-[#434655] dark:text-[#d3e4fe] hover:bg-[#004ac6]/5 dark:hover:bg-[#004ac6]/10 hover:text-[#004ac6] dark:hover:text-[#dbe1ff] flex items-center gap-3 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Settings
                </Link>

                <button
                  onClick={handleLogOut}
                  className="w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors text-left"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#434655] dark:text-[#d3e4fe] rounded-md hover:bg-[#d3e4fe]/20 focus:outline-none transition-all duration-200"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            /* Close SVG Icon */
            <svg
              className="w-6 h-6 transform transition-transform duration-300 rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger Icon */
            <svg
              className="w-6 h-6 transform transition-transform duration-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              view="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Sliding Overlay Drawer */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-[#f8f9ff]/98 backdrop-blur-md dark:bg-[#213145]/98 md:hidden transition-all duration-300 ease-in-out border-t border-[#c3c6d7]/30 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-6 p-6 h-full justify-between">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg py-2 transition-all duration-200 border-b border-[#c3c6d7]/10 ${isActive
                    ? "text-[#004ac6] dark:text-[#dbe1ff] font-bold border-l-4 border-l-[#004ac6] dark:border-l-[#dbe1ff] pl-3"
                    : "text-[#434655] dark:text-[#d3e4fe] font-medium pl-3 hover:text-[#004ac6] dark:hover:text-[#dbe1ff]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#c3c6d7]/20">
            {!isPending && !session ? (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3.5 border border-[#004ac6]/30 text-[#004ac6] dark:border-[#dbe1ff]/30 dark:text-[#dbe1ff] font-bold rounded-xl text-center active:scale-95 transition-transform duration-100">
                    Login
                  </button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3.5 bg-[#004ac6] text-white font-bold rounded-xl text-center active:scale-95 transition-transform duration-100">
                    Join Free
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Mobile Logged In User Preview */}
                <div className="flex items-center gap-4 px-3 py-2 rounded-xl bg-[#004ac6]/5">
                  <Image
                    width={44}
                    height={44}
                    src={session?.user?.image || "/default-avatar.png"}
                    alt={session?.user?.name || "User"}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#004ac6]/20"
                  />
                  <div>
                    <p className="font-bold text-sm text-[#0b1c30] dark:text-[#f8f9ff]">{session?.user?.name}</p>
                    <p className="text-xs text-[#434655] dark:text-[#d3e4fe]">{session?.user?.email}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-[#434655] dark:text-[#d3e4fe] rounded-xl hover:bg-[#004ac6]/5 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-[#434655] dark:text-[#d3e4fe] rounded-xl hover:bg-[#004ac6]/5 font-medium transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 w-full text-left px-3 py-3 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 font-medium transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
