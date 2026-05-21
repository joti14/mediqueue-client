"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function TutorSearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const initialQuery = searchParams.get("search") || "";
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
        setQuery(searchParams.get("search") || "");
    }, [searchParams]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentSearch = searchParams.get("search") || "";
            if (query === currentSearch) return;

            const params = new URLSearchParams(searchParams.toString());
            if (query.trim()) {
                params.set("search", query);
            } else {
                params.delete("search");
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, pathname, router, searchParams]);

    return (
        <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-[#004ac6] dark:text-[#dbe1ff] mb-1.5">
                Tutor Name or Keyword
            </label>
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[15px] pointer-events-none" />
                <input
                    type="text"
                    placeholder="e.g. Dr. Sarah Jenkins"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#1a2736] text-[#0b1c30] dark:text-[#f8f9ff] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 focus:border-[#004ac6] transition"
                />
            </div>
        </div>
    );
}
