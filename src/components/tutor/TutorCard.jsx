import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import Image from "next/image";

const TutorCard = ({ tutor }) => {
  const {
    title,
    description,
    thumbnail,
    category,
    price,
    duration,
    instructor,
  } = tutor;

  return (
    <Card
      className="w-full border-none bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-200"
      isPressable
    >
      <div className="p-0 relative overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={300}
          className="w-full h-[200px] object-contain rounded-t-xl"
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
        <Chip
          size="sm"
          className="mb-3 bg-gray-200 text-gray-700 font-semibold border-none"
        >
          {category}
        </Chip>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
          {description}
        </p>
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

        <Button
          size="sm"
          className="font-bold text-xs bg-[#004ac6] text-white rounded-full px-5 hover:bg-[#2563eb] transition-colors"
        >
          Book Session
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TutorCard;