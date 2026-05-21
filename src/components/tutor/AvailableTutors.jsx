import { fetchFeaturedTutors } from "@/lib/tutors/data";
import Link from "next/link";
import Image from "next/image";

const AvailableTutors = async () => {
  const tutors = await fetchFeaturedTutors();

  return (
    <section className="py-[64px] px-[16px] md:px-[40px] max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-[64px]">
        <div>
          <h2 className="font-headline text-[32px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mb-[8px]">
            Available Tutors
          </h2>
          <p className="text-[16px] text-[#434655] dark:text-[#d3e4fe]">
            Top rated academic professionals available for immediate booking.
          </p>
        </div>

        <Link href="/tutors">
          <button className="hidden md:flex items-center gap-[4px] text-[#004ac6] dark:text-[#dbe1ff] font-semibold text-[14px] hover:underline">
            View All Tutors
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
        {tutors?.map((tutor) => {
          const {
            _id,
            instructor,
            thumbnail,
            category,
            price,
            rating,
            location,
          } = tutor;

          const displayThumbnail = thumbnail || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop";

          return (
            <div
              key={_id}
              className="bg-white dark:bg-[#213145] border border-[#d9deea] dark:border-[#4b5b70] rounded-xl p-[16px] shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col"
            >
              <div className="flex-1">
                <div className="flex items-start gap-[12px]">
                  <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={displayThumbnail}
                      alt={instructor}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-[16px] leading-[1.3] text-[#0b1c30] dark:text-[#f8f9ff] line-clamp-2 min-h-[42px]">
                        {instructor}
                      </h3>

                      <div className="flex items-center gap-1 text-[#004ac6] dark:text-[#89f5e7] text-[13px] font-semibold shrink-0">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{rating?.toString().split(" ")[0]}</span>
                      </div>
                    </div>

                    <p className="text-[13px] text-[#434655] dark:text-[#d3e4fe] mt-[2px] line-clamp-1 min-h-[20px]">
                      {location}
                    </p>

                    <div className="flex items-center gap-[6px] mt-[10px] flex-wrap min-h-[28px]">
                      {category?.split(" & ").map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-[#e8f0ff] dark:bg-[#004ac6]/20 text-[#5a6475] dark:text-[#dbe1ff] rounded-full text-[11px] font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#e4e8f1] dark:border-[#445468] my-[14px]"></div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-[12px] text-[#434655] dark:text-[#d3e4fe]">
                    Hourly Fee
                  </p>
                  <p className="text-[26px] leading-none font-bold text-[#004ac6] dark:text-[#dbe1ff] mt-[4px]">
                    ${price}.00
                  </p>
                </div>

                <Link href={`/tutors/${_id || id}`}>
                  <button className="px-[20px] py-[10px] bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg text-[14px] font-semibold transition-all duration-150 whitespace-nowrap">
                    Book Session
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AvailableTutors;