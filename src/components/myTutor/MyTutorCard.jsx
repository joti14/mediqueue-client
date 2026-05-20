import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { MdOutlineVerified, MdOutlineEventAvailable } from "react-icons/md";
import { FiClock, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { UpdateModal } from "./UpdateModal";

const MyTutorCard = ({ tutor }) => {
    if (!tutor) return null;

    const {
        _id,
        title,
        thumbnail,
        category,
        available,
        instructor,
        sessionStartDate,
        price
    } = tutor;

    return (
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 mb-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Image Container */}
            <div className="relative w-full md:w-44 h-44 md:h-44 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    sizes="(max-w-768px) 100vw, 176px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Content Details */}
            <div className="flex-grow min-w-0 space-y-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 leading-tight">
                            {instructor}
                        </h2>
                        <span className="bg-[#004ac6]/10 text-[#004ac6] dark:bg-blue-500/10 dark:text-blue-400 p-0.5 rounded-full flex items-center justify-center shrink-0">
                            <MdOutlineVerified className="text-sm" />
                        </span>
                    </div>
                    <p className="text-[#004ac6] dark:text-[#dbe1ff] font-semibold text-sm">
                        {title}
                    </p>
                </div>

                {/* Session Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 pt-1">
                    <div className="flex items-center gap-2">
                        <FiClock className="text-blue-500 text-base flex-shrink-0" />
                        <span className="truncate">{available}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdOutlineEventAvailable className="text-blue-500 text-lg flex-shrink-0" />
                        <span>Starts: {sessionStartDate}</span>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-4">
                    {/* Hourly Fee */}
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                            Hourly Fee:
                        </span>
                        <span className="text-2xl font-black text-[#004ac6] dark:text-[#dbe1ff] flex items-center">
                            <FiDollarSign className="text-base -mr-0.5" />
                            {price}
                        </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        <UpdateModal tutor={tutor}/>
                        <Button
                            size="sm"
                            className="flex gap-2 font-bold text-xs bg-red-500 text-white hover:bg-red-600 rounded-lg px-5 flex gap-1 items-center shadow-sm"
                        >
                            <FaRegTrashAlt />
                            Delete Profile
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTutorCard;