import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="top">
      <div className="wrap top-in">
        <Link href="/" className="home">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul>
            <li>
              <Link href="/#work">Work</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li className="optional">
              <a href={site.github}>GitHub</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>Email</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
