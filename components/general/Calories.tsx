import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface CaloriesProps {
  calories: number;
  className?: string;
}

export default function Calories({ calories, className }: CaloriesProps) {
  return (
    <div
      className={cn(
        "shadow-lg shadow-black/30 flex justify-center items-center rounded bg-primaryColor1 p-1.5 gap-0.5 text-sm font-medium text-(--dark)/80",
        className
      )}
    >
      <Icon
        icon="mdi:fire"
        width={20}
        height={20}
        className="text-destructive"
      />
      <span className="text-[14px]">{calories}kcal / 100 g</span>
    </div>
  );
}
