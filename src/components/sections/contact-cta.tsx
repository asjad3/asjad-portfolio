"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socials = [
  {
    label: "GitHub",
    handle: "asjad3",
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

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
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
        className="border-y border-[var(--border)] py-12 sm:py-16"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-16">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Get in Touch
            </span>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
              Socials
            </h2>
          </div>

          <div className="flex flex-col border-t border-[var(--border)]">
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.12 + i * 0.06 }}
                className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-[var(--border)] py-5 transition-colors hover:border-[var(--text-muted)] sm:py-6"
              >
                <span className="w-20 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)] sm:w-24">
                  {social.label}
                </span>
                <span className="font-serif text-xl font-medium leading-snug sm:text-2xl md:text-3xl">
                  {social.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
