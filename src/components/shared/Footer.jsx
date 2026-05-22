import Link from "next/link";
import { FiBriefcase, FiMail, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookF />, label: "Facebook" },
  { href: "https://twitter.com", icon: <FaXTwitter />, label: "Twitter" },
  { href: "https://linkedin.com", icon: <FaLinkedinIn />, label: "LinkedIn" },
  { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#e5eeff] dark:bg-[#213145] border-t border-[#c3c6d7] dark:border-[#737686] py-16 mt-16 transition-colors duration-300">
      <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <MdOutlineMedicalServices className="text-2xl text-[#004ac6] dark:text-[#dbe1ff] transition-transform duration-300 group-hover:scale-105" />
            <h4 className="text-xl font-bold text-[#004ac6] dark:text-[#dbe1ff] transition-colors duration-300">
              MediQueue
            </h4>
          </Link>
          <p className="text-sm leading-relaxed text-[#434655] dark:text-[#d3e4fe] opacity-90">
            The leading global network for specialized medical tutoring and academic session management.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2 flex-wrap">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#c3c6d7] dark:border-[#737686] text-[#004ac6] dark:text-[#dbe1ff] hover:bg-[#004ac6] hover:text-white dark:hover:bg-[#004ac6] hover:border-[#004ac6] transition-all duration-150 text-sm"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-sm font-semibold text-[#0b1c30] dark:text-[#f8f9ff] mb-6">
            Quick Links
          </h5>
          <ul className="flex flex-col gap-3">
            {[
              { href: "/services", label: "Services" },
              { href: "/tutors", label: "Tutor List" },
              { href: "/pricing", label: "Pricing" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h5 className="text-sm font-semibold text-[#0b1c30] dark:text-[#f8f9ff] mb-6">
            Legal
          </h5>
          <ul className="flex flex-col gap-3">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Use" },
              { href: "/cookie-policy", label: "Cookie Policy" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#434655] dark:text-[#d3e4fe] hover:text-[#004ac6] dark:hover:text-[#dbe1ff] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-sm font-semibold text-[#0b1c30] dark:text-[#f8f9ff] mb-6">
            Contact
          </h5>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3 text-sm text-[#434655] dark:text-[#d3e4fe]">
              <FiMail className="text-base text-[#004ac6] dark:text-[#dbe1ff] flex-shrink-0" />
              support@mediqueue.edu
            </li>
            <li className="flex items-center gap-3 text-sm text-[#434655] dark:text-[#d3e4fe]">
              <FiPhone className="text-base text-[#004ac6] dark:text-[#dbe1ff] flex-shrink-0" />
              +1 (555) 0123-4567
            </li>
            <li className="flex items-center gap-3 text-sm text-[#434655] dark:text-[#d3e4fe]">
              <FiBriefcase className="text-base text-[#004ac6] dark:text-[#dbe1ff] flex-shrink-0" />
              Mon – Fri, 9am – 6pm EST
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 mt-16 pt-10 border-t border-[#c3c6d7]/30 text-center">
        <p className="text-sm text-[#434655] dark:text-[#d3e4fe] opacity-80">
          © {new Date().getFullYear()} MediQueue Academic Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}