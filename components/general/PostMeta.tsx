import { cn } from "@/lib/utils";
import Image from "next/image";

type PostMetaProps = {
  authorName: string;
  authorImage?: string | null;
  createdAt: Date | string;
  className?: string;
  showFullTime?: boolean;
};

export function PostMeta({
  authorName,
  authorImage,
  createdAt,
  className,
  showFullTime,
}: PostMetaProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 min-w-0 flex-wrap shrink",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <div className="relative size-8 rounded-full overflow-hidden">
          {authorImage && (
            <Image
              src={authorImage}
              alt={authorName}
              fill
              sizes="32px"
              loading="eager"
              className="object-cover"
            />
          )}
        </div>
        <p>{authorName}</p>
      </div>

      <time className="text-sm text-(--dark)/70">
        {new Intl.DateTimeFormat(
          "lt",
          showFullTime
            ? {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            : {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
        ).format(new Date(createdAt))}
      </time>
    </div>
  );
}
