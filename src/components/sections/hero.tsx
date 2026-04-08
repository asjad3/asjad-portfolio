"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const subtitles = [
  "Full-stack developer",
  "AI enthusiast",
  "Systems thinker",
  "Hackathon builder",
];

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [subIdx, setSubIdx] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const text = subtitles[subIdx];
    const timeout = isDeleting ? 40 : 80;

    if (!isDeleting && visibleChars >= text.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else {
      timer = setTimeout(() => {
        if (!isDeleting) {
          setVisibleChars((c) => c + 1);
        } else if (visibleChars > 0) {
          setVisibleChars((c) => c - 1);
        } else {
          setIsDeleting(false);
          setSubIdx((s) => (s + 1) % subtitles.length);
        }
      }, timeout);
    }
    return () => clearTimeout(timer);
  }, [visibleChars, isDeleting, subIdx]);

  return (
    <header
      ref={ref}
      className="relative mx-auto flex w-full max-w-[1184px] flex-col justify-end px-5 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-20 md:px-12 md:pt-52 md:pb-32"
    >
      {/* Name */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
      >
        Hussain Asjad Abbas
      </motion.h2>

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-6 flex items-center gap-3 sm:mb-8"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px w-6 origin-left bg-[var(--text-dim)] sm:w-8"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] sm:text-xs">
          Selected Works &mdash; 2026
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div style={{ y, opacity }} className="leading-[0.95] tracking-tight">
        <h1 className="font-serif font-semibold">
          <span className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 md:gap-x-4">
            {["Building", "digital"].map((word, i) => (
              <motion.span
                key={word}
                className="overflow-hidden"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <span className="inline-block text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
                  {word}
                </span>
              </motion.span>
            ))}
          </span>
          <br />
          <span className="ml-[8vw] sm:ml-[12vw] md:ml-[18vw]">
            <motion.span
              className="overflow-hidden"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className="inline-block text-4xl text-[var(--text-muted)] sm:text-5xl md:text-7xl lg:text-8xl">
                experiences
              </span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* Subtitle area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex items-start justify-between md:mt-16"
      >
        <div className="flex max-w-[280px] flex-col gap-2 sm:max-w-sm sm:gap-3">
          <span className="font-mono text-xs text-[var(--text-muted)] sm:text-sm">
            {subtitles[subIdx].slice(0, visibleChars)}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-px"
            >
              |
            </motion.span>
          </span>
          <p className="text-xs leading-relaxed text-[var(--text-dim)] sm:text-sm">
            I build things that people actually use.
          </p>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden flex-col items-center gap-2 md:flex"
        >
          <div className="h-12 w-px bg-[var(--text-dim)]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </header>
  );
}
