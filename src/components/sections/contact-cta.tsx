"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socials = [
  {
    label: "GitHub",
    handle: "@asjad3",
    href: "https://github.com/asjad3",
  },
  {
    label: "LinkedIn",
    handle: "Hussain Asjad Abbas",
    href: "https://www.linkedin.com/in/hussain-asjad-abbas-5a5a6b353/",
  },
  {
    label: "Email",
    handle: "h.asjad.abbas@gmail.com",
    href: "mailto:h.asjad.abbas@gmail.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="mx-auto w-full max-w-[1184px] px-5 py-20 sm:px-6 sm:py-24 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="border-t border-[var(--border)] pt-12 sm:pt-16"
      >
        <div className="mb-10 flex flex-col gap-2 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
            Get in Touch
          </span>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
            Socials
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/40 p-6 transition-colors hover:border-[var(--text-muted)] sm:min-h-[160px] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">
                  {social.label}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-[var(--text-dim)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--text-primary)]"
                >
                  <path
                    d="M4 12L12 4M12 4H5M12 4V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="font-serif text-xl font-medium leading-snug transition-colors group-hover:text-[var(--text-primary)] sm:text-2xl">
                {social.handle}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
