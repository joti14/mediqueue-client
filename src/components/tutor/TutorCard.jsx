import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Chip,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const TutorCard = ({ tutor }) => {
    const {
        _id,
        title,
        thumbnail,
        category,
        price,
        instructor,
        available,
        sessionStartDate,
        mode,
        rating,
    } = tutor;

    const displayThumbnail = thumbnail || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop";

    return (
        <Card className="w-full border-none bg-white dark:bg-slate-900 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-0 relative overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                    <Chip
                        size="sm"
                        className="bg-gray-200/90 backdrop-blur-sm text-gray-800 font-semibold border-none"
                    >
                        {category}
                    </Chip>
                </div>

                <Image
                    src={displayThumbnail}
                    alt={title || 'tutor'}
                    width={300}
                    height={300}
                    className="w-full h-[200px] object-cover rounded-t-xl transition-transform duration-700"
                />
            </div>

            <CardHeader className="flex-col items-start px-4 pt-4 pb-2">
                <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">
                    {instructor}
                </p>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 line-clamp-1 mb-1">
                    {title}
                </h3>
            </CardHeader>

            <div className="px-4 pt-0 pb-3 text-[12px] text-slate-600 dark:text-slate-300">
                <div className="space-y-1 mb-3">
                    <p className="wrap-break-word text-sm">
                        <span className="font-semibold">Available:</span> {available || 'N/A'}
                    </p>
                    <p className="wrap-break-word text-sm">
                        <span className="font-semibold">Starts:</span> {sessionStartDate || 'TBD'}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px]">
                    <p className="wrap-break-word">
                        <span className="font-semibold">Mode:</span> {mode || 'N/A'}
                    </p>
                    <p className="wrap-break-word">
                        <span className="font-semibold">Rating:</span> {rating || 'N/A'}
                    </p>
                </div>
            </div>

            <CardFooter className="flex justify-between items-center px-4 py-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                        Hourly Fee
                    </p>
                    <p className="text-xl font-extrabold text-[#004ac6] dark:text-[#dbe1ff]">
                        ${price}
                    </p>
                </div>

                <Link href={`/tutors/${_id}`}>
                    <Button
                        size="sm"
                        className="font-bold text-xs bg-[#004ac6] text-white rounded-full px-5 hover:bg-[#2563eb] transition-colors"
                    >
                        Book Session
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default TutorCard;