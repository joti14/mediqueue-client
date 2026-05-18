import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#e5eeff] dark:bg-[#213145] border-t border-[#c3c6d7] dark:border-[#737686] py-[64px] mt-[64px] transition-colors duration-300">
      <div className="w-full px-[16px] md:px-[40px] max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-[24px]">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-[24px]">
          <Link href="/" className="flex items-center gap-[12px] group focus:outline-none">
            <span className="text-[#004ac6] transition-transform duration-300 group-hover:scale-105 dark:text-[#dbe1ff]">
              {/* Inline SVG Medical Services Icon */}
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-10-2h4v2h-4V4zm10 15H4V8h16v11zm-9-2h2v-3h3v-2h-3V9H11v3H8v2h3v3z" />
              </svg>
            </span>
            <h4 className="font-headline text-[20px] font-bold text-[#004ac6] transition-colors duration-300 dark:text-[#dbe1ff]">
              MediQueue
            </h4>
          </Link>
          <p className="font-['Inter',sans-serif] text-[14px] leading-relaxed text-[#434655] dark:text-[#d3e4fe] opacity-90">
            The leading global network for specialized medical tutoring and academic session management.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h5 className="font-['Inter',sans-serif] text-[14px] font-semibold text-[#0b1c30] dark:text-[#f8f9ff] mb-[24px]">
            Quick Links
          </h5>
          <ul className="flex flex-col gap-[12px]">
            <li>
              <Link href="/services" className="font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/tutors" className="font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors">
                Tutor List
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h5 className="font-['Inter',sans-serif] text-[14px] font-semibold text-[#0b1c30] dark:text-[#f8f9ff] mb-[24px]">
            Legal
          </h5>
          <ul className="flex flex-col gap-[12px]">
            <li>
              <Link href="/privacy" className="font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h5 className="font-['Inter',sans-serif] text-[14px] font-semibold text-[#0b1c30] dark:text-[#f8f9ff] mb-[24px]">
            Contact
          </h5>
          <ul className="flex flex-col gap-[12px]">
            <li className="flex items-center gap-[12px] font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe]">
              {/* Mail Icon SVG */}
              <svg className="w-4 h-4 text-[#004ac6] dark:text-[#dbe1ff] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@mediqueue.edu
            </li>
            <li className="flex items-center gap-[12px] font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe]">
              {/* Phone Icon SVG */}
              <svg className="w-4 h-4 text-[#004ac6] dark:text-[#dbe1ff] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (555) 0123-4567
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1280px] mx-auto px-[16px] md:px-[40px] mt-[64px] pt-[40px] border-t border-[#c3c6d7]/30 text-center">
        <p className="font-['Inter',sans-serif] text-[14px] text-[#434655] dark:text-[#d3e4fe] opacity-80">
          © {new Date().getFullYear()} MediQueue Academic Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
