import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { TimeforkBench, TimeforkCode, TimeforkDrawing } from "@/content/figures";
import { personId, site } from "@/lib/site";

const description =
  "timefork is an open-source Rust tool that snapshots a whole project folder before each coding-agent change, using copy-on-write clones. An 18 GB project snapshots in 0.9 seconds.";

export const metadata: Metadata = {
  title: "timefork: undo for coding agents",
  description,
  alternates: { canonical: "/work/timefork" },
  openGraph: { type: "article", title: `timefork · ${site.name}`, description, url: "/work/timefork", images: ["/og/timefork.png"] },
  twitter: { card: "summary_large_image", title: `timefork · ${site.name}`, description, images: ["/og/timefork.png"] },
};

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "timefork",
      description,
      codeRepository: "https://github.com/asjad3/timefork",
      programmingLanguage: "Rust",
      license: "https://opensource.org/licenses/MIT",
      runtimePlatform: ["macOS", "Linux"],
      author: { "@id": personId },
      dateCreated: "2026-08-14",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: site.url },
        { "@type": "ListItem", position: 2, name: "timefork", item: `${site.url}/work/timefork` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <ProjectPage
      name="timefork"
      lede="An open-source Rust tool that snapshots your whole project folder before a coding agent changes it, so you can go back to any point, compare two points, or branch from one."
      data={data}
      facts={[
        { label: "Language", value: "Rust" },
        { label: "License", value: "MIT" },
        { label: "Runs on", value: "macOS (APFS) and Linux (btrfs, XFS)" },
        { label: "Source", value: <a className="link" href="https://github.com/asjad3/timefork">github.com/asjad3/timefork</a> },
      ]}
    >
      <h2>Why I built it</h2>
      <p>
        Git only protects the files it tracks. Coding agents also touch build output, installed packages and local databases, and they run
        shell commands whose effects git can’t roll back. When something goes wrong halfway through a session, there’s no clean way back.
      </p>
      <TimeforkDrawing marks={false} />
      <h2>How it works</h2>
      <ul>
        <li>Before an agent edits a file or runs a command, a hook snapshots the project folder.</li>
        <li>
          Snapshots are copy-on-write clones made by the file system (<code>clonefile</code> on macOS, reflinks on Linux), so nothing is
          copied until a file changes.
        </li>
        <li>A small journal records when each snapshot was taken, what the agent was about to do, and the git commit at the time.</li>
        <li>Restoring is undoable: timefork snapshots the current state before it brings back an older one.</li>
        <li>A fork copies any snapshot into a new folder, so several agents can work from the same point in parallel.</li>
        <li>The hook never blocks the agent. If a snapshot fails, the agent carries on.</li>
        <li>There’s no background process, file system driver or database.</li>
      </ul>
      <TimeforkCode marks={false} />
      <h2>Speed</h2>
      <p>Measured on a real 18 GB project with 78,000 files on an Apple M4.</p>
      <TimeforkBench marks={false} />
      <h2>Install</h2>
      <p>
        <code>brew install asjad3/timefork/timefork</code>, then run <code>timefork init</code> and <code>timefork install-hooks</code> in a
        project.
      </p>
      <h2>Limits</h2>
      <p>
        Snapshots live on the same disk as the project, so they aren’t a backup. On file systems without copy-on-write support, each snapshot
        is a full copy.
      </p>
    </ProjectPage>
  );
}
