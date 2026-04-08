"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/asjad3" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hussain-asjad-abbas-5a5a6b353/" },
  { label: "Email", href: "mailto:h.asjad.abbas@gmail.com" },
];

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="border-t border-[var(--border)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto w-full max-w-[1280px] px-6 md:px-12 py-12"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <span className="font-serif text-lg font-semibold">Asjad.</span>
            <span className="text-xs text-[var(--text-muted)]">
              Full-stack developer &amp; systems thinker
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:gap-12"
          >
            <div className="flex gap-8">
              {["Work", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover-underline hover:text-[var(--text-primary)]"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-xs text-[var(--text-dim)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span>Available for work</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-8 border-t border-[var(--border-light)] pt-6 flex justify-between"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-dim)]">
            &copy; {new Date().getFullYear()} Asjad. All rights reserved.
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-dim)]">
            Built with Next.js
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
