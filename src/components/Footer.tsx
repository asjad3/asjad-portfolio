import { Living } from "./Living";
import hills from "@/assets/plates/hills.webp";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="wrap foot">
      <div className="hills">
        <Living still={hills} alt="Pencil drawing of the Margalla Hills above Islamabad." sizes="(max-width: 1200px) 100vw, 1100px" />
      </div>
      <div className="foot-row" data-reveal="">
        <p>
          {site.name}, {site.city}, {site.country}
        </p>
        <ul>
          <li>
            <a className="link" href={`mailto:${site.email}`}>Email</a>
          </li>
          <li>
            <a className="link" href={site.github} rel="me">GitHub</a>
          </li>
          <li>
            <a className="link" href={site.linkedin} rel="me">LinkedIn</a>
          </li>
        </ul>
        <p>
          Updated <time dateTime={site.updated}>October 2026</time>
        </p>
      </div>
    </footer>
  );
}
