import hero from "@/assets/plates/hero.webp";
import { site } from "@/lib/site";
import { Claim, Mark, Scope } from "./ink";
import { Living } from "./Living";

export function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="name">
      <Scope className="hero-grid">
        <div>
          <h1 id="name" data-enter="">
            {site.name}
          </h1>
          <p className="line" data-highlightable="" data-enter="1">
            Product manager at ImagineArt. I <Claim k="spec" ink="lemon">write product specs</Claim>, and I{" "}
            <Claim k="code" ink="mint">still write code</Claim>.
          </p>
          <p className="intro" data-highlightable="" data-enter="2">
            Since April 2026 I’ve led AI Sheets from the first prototype to launch, owned the AI Trip Planner, and ran the launch of
            Campaign Director. Now I’m working on Imagine Echo. I live and work in Islamabad.
          </p>
          <p className="contact" data-enter="3">
            <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
            <a className="link" href={site.github} rel="me">GitHub</a>
            <a className="link" href={site.linkedin} rel="me">LinkedIn</a>
          </p>
        </div>
        <Living
          still={hero}
          alt="Pencil drawing of a printed specification folding, step by step, into a finished handheld device."
          priority
          sizes="(max-width: 960px) 90vw, 45vw"
          clip={{ src: "/motion/hero.mp4", poster: "/motion/hero-poster.webp" }}
        >
          <Mark k="spec" ink="lemon" box={[4, 22, 37, 27]} />
          <Mark k="code" ink="mint" box={[72, 51, 27, 29]} />
        </Living>
      </Scope>
    </section>
  );
}
