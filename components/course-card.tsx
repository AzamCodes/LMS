import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";
interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden image-container">
          <Image
            fill
            className="object-cover initial-blur" // Apply the initial blur class
            src={imageUrl}
            alt={title}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-base md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-[10px] text-muted-foreground w-fit mt-1 px-2 py-[1.25px] bg-sky-100 rounded-lg">
            {category}
          </p>
          <div className="my-3 bg-sky-100 w-fit rounded-lg px-2 py-[2px] gap-x-1 flex items-center text-slate-500">
            <IconBadge size={"sm"} icon={BookOpen} />
            <span className="text-xs text-sky-700">
              {chaptersLength}
              {chaptersLength === 1 ? " Chapter" : " Chapters"}
            </span>
          </div>
          {progress != null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-muted md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
