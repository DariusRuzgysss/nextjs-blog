"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import AnimationWrapperClient from "./AnimationWrapperClient";

type Props = {
  value: number;
  onChange?: (rating: number) => void;
};

export function StarRating({ value, onChange }: Props) {
  const handleClick = (star: number) => {
    if (!onChange) return;
    onChange(star);
  };

  return (
    <AnimatePresence mode="popLayout">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <AnimationWrapperClient key={star}>
            <motion.button
              initial={{ opacity: 0, y: 0, x: -100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 0, x: 100 }}
              transition={{ duration: 0.6, delay: star * 0.1 }}
              type="button"
              onClick={() => handleClick(star)}
              className="focus:outline-none active:bg-active rounded-full p-1"
            >
              <Star
                className={cn(
                  "lg:h-6 lg:w-6 h-5 w-5 transition-colors",
                  star <= value
                    ? "fill-active text-active"
                    : "text-muted-foreground",
                  onChange && "cursor-pointer hover:text-active"
                )}
              />
            </motion.button>
          </AnimationWrapperClient>
        ))}
      </div>
    </AnimatePresence>
  );
}
