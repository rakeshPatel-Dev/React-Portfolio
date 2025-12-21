"use client";

import { motion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -24,
        y: 24,
        scale: 0.97,
        filter: "blur(6px)",
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        x: 24,
        y: -24,
        scale: 0.98,
        filter: "blur(6px)",
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.35 },
        scale: { duration: 0.45 },
      }}
      className="h-full overflow-hidden will-change-transform"
    >
      {children}
    </motion.div>
  );
}
