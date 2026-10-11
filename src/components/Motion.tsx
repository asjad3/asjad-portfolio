"use client";

import { useEffect } from "react";

/**
 * Scroll reveals and living drawings. Nothing moves without the `motion` class, which the boot script
 * sets unless the visitor prefers reduced motion or has data saver on.
 * - [data-reveal] blocks and the paragraphs of .prose that start below the fold are held back, then rise
 *   into place as they scroll in, staggered when several arrive together. Anything already on screen is left alone.
 * - [data-living] drawings play their clip, or get a pencil sweep, once they're well into view.
 *   Their highlighter marks ink after that.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hydrated");
    const figures = [...document.querySelectorAll<HTMLElement>("[data-living]")];
    if (!root.classList.contains("motion")) {
      figures.forEach((f) => f.classList.add("drawn", "done", "still"));
      return;
    }

    // ───── reveals ─────
    const reveal = new IntersectionObserver(
      (entries) =>
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.setProperty("--d", `${Math.min(i, 4) * 90}ms`);
            el.classList.add("in");
            reveal.unobserve(el);
          }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    const seen = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal], .prose > *").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.getBoundingClientRect().top < innerHeight) return;
        el.classList.add("hold");
        reveal.observe(el);
      });
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    // ───── living drawings ─────
    const finish = (f: HTMLElement) => {
      f.classList.add("done");
      if (f.dataset.settle === "still") f.classList.add("still");
    };
    const load = (v: HTMLVideoElement) => {
      if (v.getAttribute("src")) return;
      v.muted = true;
      v.src = v.dataset.src ?? "";
      v.load();
    };
    const near = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          near.unobserve(e.target);
          const v = e.target.querySelector("video");
          if (v) load(v);
        }),
      { rootMargin: "400px 0px" },
    );
    const play = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          play.unobserve(e.target);
          const f = e.target as HTMLElement;
          f.classList.add("drawn");
          const v = f.querySelector("video");
          if (!v) {
            window.setTimeout(() => finish(f), 1500);
            return;
          }
          const fallback = () => {
            f.classList.add("still");
            finish(f);
          };
          load(v);
          v.addEventListener("ended", () => finish(f), { once: true });
          v.addEventListener("error", fallback, { once: true });
          v.play().catch(fallback);
        }),
      { rootMargin: "0px 0px -20% 0px" },
    );
    figures.forEach((f) => {
      near.observe(f);
      play.observe(f);
    });

    return () => {
      reveal.disconnect();
      mutations.disconnect();
      near.disconnect();
      play.disconnect();
    };
  }, []);

  return null;
}
