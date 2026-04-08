"use client";

import { projects } from "@/lib/projects";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const categoryFilters = ["All", ...new Set(projects.map((p) => p.category))];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, margin: "-30px" });

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="mx-auto w-full max-w-[1184px] px-5 py-20 sm:px-6 sm:py-24 md:px-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-10 sm:mb-16">
        <div className="mb-6 sm:mb-10">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Work
            </span>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
              Projects
            </h2>
          </div>
        </div>

        {/* Category filters */}
        <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 sm:overflow-visible md:-mx-12 md:px-12">
          <div className="flex gap-2 whitespace-nowrap" role="radiogroup" aria-label="Filter projects by category">
            {categoryFilters.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileTap={{ scale: 0.95 }}
                role="radio"
                aria-checked={activeFilter === cat}
                className={`rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all sm:px-4 sm:py-2 ${
                  activeFilter === cat
                    ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                    : "border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Project list */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeFilter}
          ref={listRef}
          initial="hidden"
          animate={listInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-0"
        >
          {filtered.map((project) => (
            <motion.article
              key={project.slug}
              variants={itemVariants}
              className="flex flex-col gap-4 border-t border-[var(--border)] py-8 sm:flex-row sm:items-start sm:justify-between sm:py-10 md:py-12"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                    {project.category}
                  </span>
                  <span className="text-[var(--text-dim)]">/</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                    {project.year}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-start sm:gap-3">
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--text-primary)]"
                  >
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--text-primary)]"
                    >
                      Live
                    </a>
                  )}
                </div>
                <motion.div
                  className="hidden items-center text-[var(--text-dim)] sm:flex"
                  whileHover={{ x: 8, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
