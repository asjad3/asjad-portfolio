"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBg() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block">
      <motion.div
        style={{ y: y1 }}
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full border border-[var(--border)] opacity-30"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-12 top-40 opacity-20"
      >
        <svg width="60" height="120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={(i % 4) * 15 + 5}
              cy={Math.floor(i / 4) * 15 + 5}
              r="1"
              fill="currentColor"
              className="text-[var(--text-dim)]"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
