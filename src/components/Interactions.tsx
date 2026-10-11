"use client";

import { useEffect } from "react";

/**
 * Wires every [data-scope]: inks the highlighters when the block enters view, and
 * pairs each claim with its receipt on hover or focus (the pair lights up, the rest dims).
 */
export function Interactions() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
    const scopes = [...document.querySelectorAll<HTMLElement>("[data-scope]")];

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const claims = [...e.target.querySelectorAll<HTMLElement>("mark.claim")];
          claims.forEach((c, i) => (c.style.transitionDelay = `${400 + i * 260}ms, 0ms`));
          e.target.classList.add("inked");
          window.setTimeout(() => claims.forEach((c) => (c.style.transitionDelay = "")), 400 + claims.length * 260 + 900);
        }),
      { rootMargin: "0px 0px -25% 0px" },
    );
    scopes.forEach((s) => io.observe(s));

    const cleanups: (() => void)[] = [];
    for (const scope of scopes) {
      const nodes = [...scope.querySelectorAll<HTMLElement>("[data-claim],[data-ev]")];
      const set = (k: string | null) => {
        scope.classList.toggle("focus", !!k);
        nodes.forEach((n) => n.classList.toggle("on", !!k && (n.dataset.claim ?? n.dataset.ev) === k));
      };
      for (const n of nodes) {
        const key = n.dataset.claim ?? n.dataset.ev ?? null;
        const enter = () => set(key);
        const leave = () => set(null);
        n.addEventListener("mouseenter", enter);
        n.addEventListener("mouseleave", leave);
        n.addEventListener("focus", enter);
        n.addEventListener("blur", leave);
        if (n.dataset.claim) n.tabIndex = 0;
        cleanups.push(() => {
          n.removeEventListener("mouseenter", enter);
          n.removeEventListener("mouseleave", leave);
          n.removeEventListener("focus", enter);
          n.removeEventListener("blur", leave);
        });
      }
    }
    return () => {
      io.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
