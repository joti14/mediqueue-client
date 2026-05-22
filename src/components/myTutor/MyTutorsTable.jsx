"use client";

import React from "react";
import Image from "next/image";
import { Chip } from "@heroui/react";
import { MdOutlineVerified } from "react-icons/md";
import { FiClock, FiDollarSign } from "react-icons/fi";
import { UpdateModal } from "./UpdateModal";
import { DeleteTutor } from "./DeleteTutor";

export default function MyTutorsTable({ tutors }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                            <th className="px-6 py-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400">
                                Tutor / Course
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400">
                                Subject
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400">
                                Price
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-slate-500 dark:text-slate-400">
                                Available Time
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {tutors.map((tutor) => {
                            const displayThumbnail = tutor.thumbnail?.trim()
                                ? tutor.thumbnail
                                : "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop";

                            return (
                                <tr
                                    key={tutor._id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                >
                                    {/* Tutor Name & Image */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex-shrink-0">
                                                <Image
                                                    src={displayThumbnail}
                                                    alt={tutor.instructor || "Tutor"}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                                                        {tutor.instructor || "Unknown Tutor"}
                                                    </span>
                                                    <span className="bg-[#004ac6]/10 text-[#004ac6] dark:bg-blue-500/10 dark:text-blue-400 p-0.5 rounded-full flex items-center justify-center shrink-0">
                                                        <MdOutlineVerified className="text-xs" />
                                                    </span>
                                                </div>
                                                <p className="text-[#004ac6] dark:text-[#dbe1ff] text-xs font-semibold truncate max-w-[220px]">
                                                    {tutor.title}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category Subject */}
                                    <td className="px-6 py-4">
                                        <Chip
                                            size="sm"
                                            className="bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50 font-semibold px-2.5"
                                        >
                                            {tutor.category || "General"}
                                        </Chip>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4">
                                        <span className="text-base font-extrabold text-[#004ac6] dark:text-[#dbe1ff] flex items-center">
                                            <FiDollarSign className="text-xs -mr-0.5" />
                                            {tutor.price || "0"}/hr
                                        </span>
                                    </td>

                                    {/* Available Days/Time */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                                            <FiClock className="text-blue-500 flex-shrink-0" />
                                            <span className="truncate max-w-[180px]">{tutor.available || "Not scheduled"}</span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <UpdateModal tutor={tutor} />
                                            <DeleteTutor tutor={tutor} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
