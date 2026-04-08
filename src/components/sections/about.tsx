"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/lib/projects";

const stats = [
  { value: "8+", label: "Projects" },
  { value: "6+", label: "Languages" },
  { value: "3", label: "Live Apps" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="mx-auto w-full max-w-[1184px] px-5 py-20 sm:px-6 sm:py-24 md:px-12">
      <div className="mb-10 flex flex-col gap-2 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
          About
        </span>
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
          Background & Journey
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Left */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-6 sm:gap-8"
        >
          <motion.h3
            variants={itemVariants}
            className="font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
          >
            Developer who thinks in systems.
          </motion.h3>
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:gap-5 text-sm leading-relaxed text-[var(--text-muted)]">
            <p>
              I started building web apps because I liked the idea that code could
              actually do something people use. Since then I&apos;ve shipped
              e-commerce platforms, mobile apps, hackathon projects, and AI tools —
              usually learning the stack as I go.
            </p>
            <p>
              I&apos;m at NUST right now. Most of my projects use Next.js on the
              front end and something like Supabase or Express on the back. Lately
              I&apos;ve been messing with LLM APIs and MCP servers to build agents
              that can actually do useful things.
            </p>
            <p>
              If something breaks, I read the logs instead of guessing. That&apos;s
              about it.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Stats + Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-6 sm:gap-8"
        >
          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pb-6 sm:gap-6 sm:pb-8 border-b border-[var(--border)]"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col gap-1"
              >
                <span className="font-serif text-2xl font-semibold sm:text-3xl">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="flex flex-col">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                variants={itemVariants}
                className={`group flex gap-4 pb-8 sm:gap-5 ${
                  i < timeline.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] font-mono text-xs font-medium text-[var(--text-muted)] transition-all group-hover:border-[var(--text-primary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] sm:h-9 sm:w-9">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="mt-2 h-full w-px bg-[var(--border)]" />
                  )}
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-serif text-base font-semibold sm:text-lg">{item.title}</span>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
