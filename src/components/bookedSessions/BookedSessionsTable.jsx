"use client";

import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import { MdOutlineVerified } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function BookedSessionsTable({ bookings }) {
    const router = useRouter();
    const [cancelledIds, setCancelledIds] = useState(
        () => new Set(bookings.filter(b => b.status === "cancelled").map(b => b._id))
    );
    const [cancelId, setCancelId] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);

    const handleCancel = (id) => {
        setCancelId(id);
    };

    const confirmCancel = async () => {
        if (!cancelId) return;
        setIsCancelling(true);
        const { data: tokenData } = await authClient.token();
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const res = await fetch(`${apiUrl}/my-tutors/${cancelId}`, {
                method: "PATCH",
                headers: { 
                    "content-type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({ status: "cancelled" }),
            });

            if (res.ok) {
                setCancelledIds((prev) => new Set([...prev, cancelId]));
                toast.success("Session cancelled successfully.");
                router.refresh();
            } else {
                toast.error("Failed to cancel. Please try again.");
            }
        } catch (error) {
            console.error("Cancel error:", error);
            toast.error("Something went wrong");
        } finally {
            setIsCancelling(false);
            setCancelId(null);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                                Tutor Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                                Student Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                                Phone
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                                Cancel
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {bookings.map((booking) => {
                            const isCancelled = cancelledIds.has(booking._id);

                            return (
                                <tr
                                    key={booking._id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    {/* Tutor Name */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                {booking.instructor || booking.fullName || "N/A"}
                                            </span>
                                            <MdOutlineVerified className="text-blue-500 text-sm shrink-0" />
                                        </div>
                                    </td>

                                    {/* Student Name */}
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                        {booking.studentName || booking.name || "N/A"}
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                        {booking.email || booking.studentEmail || "N/A"}
                                    </td>

                                    {/* Phone */}
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                        {booking.phone || "N/A"}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        {isCancelled ? (
                                            <Chip
                                                size="sm"
                                                className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-semibold px-3"
                                            >
                                                Cancelled
                                            </Chip>
                                        ) : (
                                            <Chip
                                                size="sm"
                                                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-semibold px-3"
                                            >
                                                Confirmed
                                            </Chip>
                                        )}
                                    </td>

                                    {/* Cancel */}
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            disabled={isCancelled}
                                            onClick={() => handleCancel(booking._id)}
                                            className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors ${
                                                isCancelled
                                                    ? "text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
                                                    : "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                                            }`}
                                        >
                                            {isCancelled ? "Cancelled" : "✕ Cancel"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {cancelId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            Confirm Cancellation
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            Are you sure you want to cancel this booking? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setCancelId(null)}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            >
                                Keep Booking
                            </button>
                            <button
                                onClick={confirmCancel}
                                disabled={isCancelling}
                                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-lg transition-colors cursor-pointer"
                            >
                                {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
