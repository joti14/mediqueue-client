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
        duration,
        instructor,
        experience,
        location,
        mode,
        rating,
    } = tutor;

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
                    src={thumbnail || "/placeholder.png"}
                    alt={title || "Tutor course"}
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

            <div className="px-4 pt-0 pb-3">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-slate-600 dark:text-slate-300">
                    <p>
                        <span className="font-semibold">Exp:</span> {experience}
                    </p>
                    <p>
                        <span className="font-semibold">Location:</span> {location}
                    </p>
                    <p>
                        <span className="font-semibold">Mode:</span> {mode}
                    </p>
                    <p>
                        <span className="font-semibold">Rating:</span> {rating}
                    </p>
                </div>
            </div>

            <CardFooter className="flex justify-between items-center px-4 py-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                        Duration: {duration}
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