"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/lib/projects";

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
          Overview
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
            Product-minded builder focused on AI systems.
          </motion.h3>
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:gap-5 text-sm leading-relaxed text-[var(--text-muted)]">
            <p>
              Computer science student at NUST. I care about shaping useful product
              ideas, validating them quickly, and building enough of the system to
              make the experience real.
            </p>
            <p>
              Recent work includes an empirical study of LLM fusion on OpenRouter,
              MCP servers for agent tooling, and a FastAPI service that uses pgvector
              for face-based photo retrieval at scale.
            </p>
            <p>
              I like working at the intersection of product, design, and technical
              execution, especially where AI can make workflows simpler or more
              personal.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-6 sm:gap-8"
        >
          <motion.div variants={itemVariants} className="flex flex-col">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className={`group flex gap-4 pb-8 sm:gap-5 ${
                  i < timeline.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="mt-1.5 h-2 w-2 shrink-0 border border-[var(--border)] bg-[var(--bg-primary)]" />
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
