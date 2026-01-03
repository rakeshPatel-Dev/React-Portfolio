"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: -24, filter: "blur(4px)" }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      exit={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 16, filter: "blur(2px)" }
      }
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1], // modern ease-out
      }}
      className="h-full will-change-[transform,opacity]"
    >
      {children}
    </motion.main>
  );
}
