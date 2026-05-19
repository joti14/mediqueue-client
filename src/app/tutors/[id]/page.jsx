import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEventAvailable, MdOutlineVerified } from "react-icons/md";
import { PiInfoBold } from "react-icons/pi";

const fetchSingleTutor = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data || {};
};

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const tutor = await fetchSingleTutor(id);

  if (!tutor || Object.keys(tutor).length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-[16px] py-[64px] text-center">
        <p className="text-lg text-slate-500 font-semibold">
          Tutor details not found.
        </p>
        <Link
          href="/tutors"
          className="text-[#004ac6] hover:underline mt-4 inline-block"
        >
          Return to Tutor Directory
        </Link>
      </div>
    );
  }

  const {
    title,
    instructor,
    description,
    thumbnail,
    category,
    price,
    duration,
    experience,
    location,
    mode,
    available,
    remainingSlots,
    sessionStartDate,
  } = tutor;

  return (
    <div className="max-w-5xl mx-auto px-[16px] md:px-[40px] py-[48px]">
      <section className="space-y-[24px]">
        <div className="bg-white dark:bg-[#213145] rounded-xl p-8 border border-[#c3c6d7] dark:border-[#737686] shadow-[0_2px_4px_rgba(15,23,42,0.05)] overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 mx-auto md:mx-0">
              <img
                className="w-full h-full object-cover rounded-xl shadow-lg border border-[#c3c6d7]/30"
                src={thumbnail}
                alt={instructor}
              />
              <div className="absolute -bottom-2 -right-2 bg-[#004ac6] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                <MdOutlineVerified className="text-sm" />
                Verified
              </div>
            </div>

            {/* Main Title, Subtitles, and About Descriptions */}
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start flex-wrap gap-4">
                <div>
                  <h1 className="font-headline text-[32px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] leading-none mb-1">
                    {instructor.split(" (")[0]}
                  </h1>
                  <p className="text-[#004ac6] dark:text-[#dbe1ff] font-semibold text-[16px] md:text-[18px]">
                    {title}
                  </p>
                  <p className="text-[#434655] dark:text-[#d3e4fe] flex items-center justify-center md:justify-start gap-1 mt-2 text-[14px]">
                    <IoLocationOutline className="text-base" />
                    {location}
                  </p>
                </div>

                {/* Rate and Book button */}
                <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                  <div className="bg-[#dce9ff] dark:bg-[#004ac6]/20 px-5 py-2.5 rounded-lg border border-[#c3c6d7] dark:border-[#737686] text-center min-w-[140px]">
                    <div className="text-[#004ac6] dark:text-[#dbe1ff] font-bold text-[20px] font-headline">
                      ${price}/hr
                    </div>
                    <div className="text-[#434655] dark:text-[#d3e4fe] text-[12px] font-semibold uppercase tracking-wide">
                      Rate
                    </div>
                  </div>

                  <button className="px-[24px] py-[12px] bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg text-[14px] font-semibold active:scale-95 transition-all duration-150 shadow-md">
                    Book Session
                  </button>
                </div>
              </div>

              {/* About Description Text */}
              <div className="mt-8">
                <h3 className="font-headline text-[20px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mb-3">
                  About Tutor
                </h3>
                <p className="text-[#434655] dark:text-[#d3e4fe] text-[15px] leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-[#e5eeff] dark:bg-[#737686]/20 text-[#004ac6] dark:text-[#dbe1ff] px-4 py-1.5 rounded-full text-[13px] font-semibold border border-[#c3c6d7] dark:border-[#737686]">
                  {category}
                </span>
                <span className="bg-[#e5eeff] dark:bg-[#737686]/20 text-[#004ac6] dark:text-[#dbe1ff] px-4 py-1.5 rounded-full text-[13px] font-semibold border border-[#c3c6d7] dark:border-[#737686]">
                  {experience}
                </span>
                <span className="bg-[#e5eeff] dark:bg-[#737686]/20 text-[#004ac6] dark:text-[#dbe1ff] px-4 py-1.5 rounded-full text-[13px] font-semibold border border-[#c3c6d7] dark:border-[#737686]">
                  {duration} Course
                </span>
                <span className="bg-[#e5eeff] dark:bg-[#737686]/20 text-[#004ac6] dark:text-[#dbe1ff] px-4 py-1.5 rounded-full text-[13px] font-semibold border border-[#c3c6d7] dark:border-[#737686] uppercase">
                  {mode} Class
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <div className="bg-white dark:bg-[#213145] p-6 rounded-xl border border-[#c3c6d7] dark:border-[#737686] shadow-[0_2px_4px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-5 border-b border-[#c3c6d7]/30 dark:border-[#737686]/30 pb-3">
              <FiBookOpen className="w-5 h-5 text-[#004ac6] dark:text-[#dbe1ff]"/>
              <h3 className="font-headline text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                Experience
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-1.5 bg-[#004ac6] dark:bg-[#dbe1ff] rounded-full self-stretch"></div>
                <div>
                  <p className="font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                    Senior Academic Practitioner
                  </p>
                  <p className="text-[#434655] dark:text-[#d3e4fe] text-[13px]">
                    MediQueue Academy • {experience}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-1.5 bg-[#004ac6]/30 dark:bg-[#dbe1ff]/30 rounded-full self-stretch"></div>
                <div>
                  <p className="font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                    Academic Residency Instructor
                  </p>
                  <p className="text-[#434655] dark:text-[#d3e4fe] text-[13px]">
                    {location} Clinical Specialist
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#213145] p-6 rounded-xl border border-[#c3c6d7] dark:border-[#737686] shadow-[0_2px_4px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 mb-5 border-b border-[#c3c6d7]/30 dark:border-[#737686]/30 pb-3">
              <MdOutlineEventAvailable className="w-5 h-5 text-[#004ac6] dark:text-[#dbe1ff]"/>
              <h3 className="font-headline text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                Availability
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2.5 border-b border-[#c3c6d7]/20">
                <span className="text-[#0b1c30] dark:text-[#f8f9ff] font-medium text-[14px]">
                  Weekly Hours
                </span>
                <span className="text-[#434655] dark:text-[#d3e4fe] text-[13px] font-bold">
                  {available}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-[#c3c6d7]/20">
                <span className="text-[#0b1c30] dark:text-[#f8f9ff] font-medium text-[14px]">
                  Next Session Starts
                </span>
                <span className="text-[#434655] dark:text-[#d3e4fe] text-[13px] font-bold">
                  {sessionStartDate}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-[#c3c6d7]/20">
                <span className="text-[#0b1c30] dark:text-[#f8f9ff] font-medium text-[14px]">
                  Remaining Seats
                </span>
                <span className="text-[#006a61] dark:text-[#89f5e7] text-[13px] font-bold bg-[#006a61]/5 px-2 py-0.5 rounded">
                  {remainingSlots} left
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[#006a61] dark:text-[#89f5e7] font-semibold text-[13px]">
                <PiInfoBold className="w-[18px] h-[18px] flex-shrink-0" />
                Response time: ~2 hours
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorDetailsPage;