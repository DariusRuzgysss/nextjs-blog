"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  className?: string;
  dotCount?: number;
  dotSize?: number;
  dotColor?: string;
  dotSpacing?: number;
}

export default function LoaderDots({
  className = "",
  dotCount = 3,
  dotSize = 8,
  dotColor = "#9FDC26",
  dotSpacing = 4,
}: LoaderProps) {
  const dots = Array.from({ length: dotCount });

  const bounce = {
    y: [0, -6, 0],
  };

  const transition = (i: number) => ({
    duration: 0.6,
    repeat: Infinity,
    delay: i * 0.2,
  });

  return (
    <main
      className={`flex items-center justify-center gap-${dotSpacing} ${className}`}
    >
      {dots.map((_, i) => (
        <motion.div
          key={i}
          animate={bounce}
          transition={transition(i)}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
          }}
        />
      ))}
    </main>
  );
}
