"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Combined scroll listener
  useEffect(() => {
    const el = document.getElementById("scroll-progress");
    if (el) el.style.width = "100vw";

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (el) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        el.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom cursor
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    if (!cursor) return;

    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 6 + "px";
      cursor.style.top = e.clientY - 6 + "px";
    };
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      cursor.classList.toggle("hovering", !!target.closest("a, button, .group"));
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-6 md:px-12">
          <a href="/" className="text-lg font-serif font-semibold tracking-tight">
            Asjad.
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#work" className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">Work</a>
            <a href="#about" className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">About</a>
            <a href="#contact" className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">Contact</a>
          </div>

          <a
            href="mailto:h.asjad.abbas@gmail.com"
            className="hidden md:flex h-[36px] items-center rounded-full bg-[var(--text-primary)] px-5 text-xs font-medium uppercase tracking-widest text-[var(--bg-primary)] transition-opacity hover:opacity-80"
          >
            Let&apos;s Talk
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 md:hidden p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-[2px] w-5 bg-[var(--text-primary)]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-[2px] w-5 bg-[var(--text-primary)]"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[var(--bg-primary)]"
          >
            {["Work", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-serif font-semibold"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="https://www.linkedin.com/in/hussain-asjad-abbas-5a5a6b353/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="text-xl font-mono text-[var(--text-muted)]"
            >
              LinkedIn
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
