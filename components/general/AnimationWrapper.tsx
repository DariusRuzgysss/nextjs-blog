"use client";

import {
  motion,
  AnimatePresence,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";

export default function AnimationWrapper({
  children,
  initial,
  animate,
}: {
  children: React.ReactNode;
  initial?: boolean | TargetAndTransition | VariantLabels | undefined;
  animate?: boolean | TargetAndTransition | VariantLabels | undefined;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={initial}
        animate={animate}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
