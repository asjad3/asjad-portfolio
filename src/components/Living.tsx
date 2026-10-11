import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type Clip = { src: string; poster: string };

/**
 * A pencil drawing that comes to life when it scrolls into view.
 * With a clip, the clip plays once and rests on its last frame (or settles back on the still).
 * Without one, the drawing is revealed with a pencil sweep. Highlighter marks wait until it's done.
 * The still image is always in the markup, so no-JS and reduced-motion visitors see the finished drawing.
 */
export function Living({
  still,
  alt,
  sizes,
  priority,
  clip,
  settle = "clip",
  children,
}: {
  still: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  clip?: Clip;
  settle?: "clip" | "still";
  children?: ReactNode;
}) {
  return (
    <figure className={clip ? "drawing living has-clip" : "drawing living"} data-living="" data-settle={settle}>
      <Image src={still} alt={alt} sizes={sizes} priority={priority} />
      {clip ? <video className="clip" muted playsInline preload="none" poster={clip.poster} data-src={clip.src} aria-hidden="true" tabIndex={-1} /> : null}
      {children}
    </figure>
  );
}
