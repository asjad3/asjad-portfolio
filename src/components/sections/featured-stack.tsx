"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";


const techCategories = [
  {
    label: "Frontend",
    items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "React Native"],
    span: "md:col-span-2",
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "Supabase", "PostgreSQL", "MongoDB"],
    span: "md:col-span-2",
  },
  {
    label: "AI / ML",
    items: ["Groq", "OpenAI", "Gemini"],
    span: "md:col-span-1",
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "Vercel", "SQLite", "MySQL", "GraphQL", "REST APIs"],
    span: "md:col-span-3",
  },
];

export function FeaturedStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="mx-auto w-full max-w-[1184px] px-5 py-20 sm:px-6 sm:py-24 md:px-12">
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
          Stack
        </span>
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
          Technologies
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        {techCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.05 + i * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={`group relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--bg-primary)] p-5 transition-colors hover:border-[var(--text-muted)] sm:p-6 ${cat.span}`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">
              {cat.label}
            </span>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
              {cat.items.map((tech, j) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.25,
                    delay: 0.1 + i * 0.06 + j * 0.03,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="inline-block cursor-default rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-mono text-[var(--text-muted)] transition-colors hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
