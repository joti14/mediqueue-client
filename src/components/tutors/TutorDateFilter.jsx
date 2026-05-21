"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiRotateCcw } from "react-icons/fi";

export default function TutorDateFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const handleDateChange = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        router.push(pathname, { scroll: false });
    };

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
            <div className="sm:w-52">
                <label className="block text-xs font-semibold text-[#004ac6] dark:text-[#dbe1ff] mb-1.5">
                    Start Date
                </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleDateChange("startDate", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#1a2736] text-[#0b1c30] dark:text-[#f8f9ff] text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 focus:border-[#004ac6] transition cursor-pointer"
                />
            </div>

            <div className="sm:w-52">
                <label className="block text-xs font-semibold text-[#004ac6] dark:text-[#dbe1ff] mb-1.5">
                    End Date
                </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => handleDateChange("endDate", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#1a2736] text-[#0b1c30] dark:text-[#f8f9ff] text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 focus:border-[#004ac6] transition cursor-pointer"
                />
            </div>

            <div className="sm:self-end">
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] active:scale-95 text-white font-semibold text-sm rounded-lg shadow-md transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                    <FiRotateCcw className="text-base" />
                    Reset
                </button>
            </div>
        </div>
    );
}
