"use client";

import {
  motion,
  AnimatePresence,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";
import { ElementType, ReactNode } from "react";

interface AnimationWrapperClientProps {
  children: ReactNode;
  initial?: boolean | TargetAndTransition | VariantLabels;
  animate?: boolean | TargetAndTransition | VariantLabels;
  exit?: boolean | TargetAndTransition | VariantLabels;
  transition?: { duration: number };
  className?: string;
  onClick?: () => void;
  motionComponent?: ElementType;
}

export default function AnimationWrapperClient({
  children,
  initial,
  animate,
  transition,
  exit,
  className,
  onClick,
  motionComponent: Motion = motion.div,
}: AnimationWrapperClientProps) {
  return (
    <AnimatePresence mode="wait">
      <Motion
        initial={initial}
        animate={animate}
        exit={exit || { opacity: 0 }}
        transition={transition || { duration: 0.5 }}
        className={className}
        onClick={onClick}
      >
        {children}
      </Motion>
    </AnimatePresence>
  );
}
