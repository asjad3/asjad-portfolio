"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  {
    label: "Email",
    value: "h.asjad.abbas@gmail.com",
    href: "mailto:h.asjad.abbas@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Hussain Asjad Abbas",
    href: "https://www.linkedin.com/in/hussain-asjad-abbas-5a5a6b353/",
  },
  {
    label: "GitHub",
    value: "@asjad3",
    href: "https://github.com/asjad3",
  },
];

export function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="mx-auto w-full max-w-[1184px] px-5 py-20 sm:px-6 sm:py-24 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="border-t border-[var(--border)] pt-12 sm:pt-16"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex max-w-md flex-col gap-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Let&apos;s build
              <br />
              <span className="text-[var(--text-muted)]">something together.</span>
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              I&apos;m always open to interesting projects, hackathons, and
              collaborations. If you have something in mind, let&apos;s talk.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            className="flex flex-col gap-0"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group flex items-baseline gap-3 border-b border-[var(--border)] py-5 transition-colors hover:border-[var(--text-muted)] sm:gap-6 sm:py-6 md:py-8"
              >
                <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)] sm:w-24">
                  {link.label}
                </span>
                <span className="font-serif text-base font-medium sm:text-lg md:text-xl">
                  {link.value}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="ml-auto shrink-0 text-[var(--text-dim)] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                >
                  <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
