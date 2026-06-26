"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/asjad3" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hussain-asjad-abbas-5a5a6b353/" },
  { label: "Email", href: "mailto:h.asjad.abbas@gmail.com" },
];

const navLinks = ["Work", "About", "Contact"];

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="border-t border-[var(--border)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto w-full max-w-[1280px] px-6 py-12 md:px-12"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="max-w-sm"
          >
            <span className="font-serif text-xl font-semibold">Asjad.</span>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Product builder at NUST, working across product thinking, systems,
              and useful software.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">
              Site
            </span>
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                {item}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">
              Socials
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-10 border-t border-[var(--border-light)] pt-6"
        >
          <span className="text-xs text-[var(--text-dim)]">
            &copy; Asjad. All rights reserved.
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
