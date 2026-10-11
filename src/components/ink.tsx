import type { ElementType, ReactNode } from "react";

/** One highlighter per pair: a phrase and the evidence for it. */
export type Ink = "lemon" | "rose" | "mint" | "sky";

/** A block whose highlighted phrases and evidence light up together on hover. */
export function Scope({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return (
    <Tag className={className} data-scope="">
      {children}
    </Tag>
  );
}

/** A highlighted phrase, in the same ink as its evidence. */
export function Claim({ k, ink, children }: { k: string; ink: Ink; children: ReactNode }) {
  return (
    <mark className="claim" data-claim={k} data-ink={ink}>
      {children}
    </mark>
  );
}

/** A highlighter swipe over part of an image: [left, top, width, height] in %. */
export function Mark({ k, ink, box }: { k: string; ink: Ink; box: [number, number, number, number] }) {
  const [left, top, width, height] = box;
  return (
    <span
      className="mark"
      data-ev={k}
      data-ink={ink}
      aria-hidden="true"
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
    />
  );
}
