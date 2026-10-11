import { Project } from "@/components/Project";
import { Claim } from "@/components/ink";
import {
  GalleristDrawing,
  GalleristShot,
  SheetsDrawing,
  SheetsShot,
  TimeforkBench,
  TimeforkCode,
  TimeforkDrawing,
} from "./figures";

export function Featured() {
  return (
    <>
      <Project
        id="ai-sheets"
        name="AI Sheets"
        meta="Chatly · Feature lead · 2026"
        actions={[
          { label: "Try it on Chatly", href: "https://chatly.ai/agent/sheets" },
          { label: "More about AI Sheets", href: "/work/ai-sheets" },
        ]}
        proof={<SheetsShot />}
        drawing={<SheetsDrawing />}
      >
        AI Sheets builds a spreadsheet <Claim k="prompt" ink="lemon">from a single prompt</Claim>, with{" "}
        <Claim k="sheets" ink="rose">formulas, pivot tables and charts across several sheets</Claim>. I led it from the first prototype to{" "}
        <Claim k="live" ink="mint">launch</Claim>. Early on we chose to license a spreadsheet engine instead of building our own, so the team
        could spend its time on the AI that writes the workbooks.
      </Project>

      <Project
        id="timefork"
        name="timefork"
        meta="Open source · Rust · 2026"
        actions={[
          { label: "Source on GitHub", href: "https://github.com/asjad3/timefork" },
          { label: "More about timefork", href: "/work/timefork" },
        ]}
        proof={
          <>
            <TimeforkCode />
            <TimeforkBench />
          </>
        }
        drawing={<TimeforkDrawing />}
      >
        Coding agents sometimes delete or overwrite things git never tracked, like build output, node_modules or a local database.
        timefork takes a snapshot of the whole project folder <Claim k="before" ink="lemon">before each change an agent makes</Claim>,
        using the file system’s <Claim k="cow" ink="rose">copy-on-write clones</Claim>, so you can go back to any point or branch from it.
        On an 18 GB project a snapshot takes <Claim k="speed" ink="sky">0.9 seconds</Claim> and almost no extra disk space.
      </Project>

      <Project
        id="gallerist"
        name="Gallerist"
        meta="Web app · 2026"
        actions={[
          { label: "Open Gallerist", href: "https://galleristapp.vercel.app" },
          { label: "More about Gallerist", href: "/work/gallerist" },
        ]}
        proof={<GalleristShot />}
        drawing={<GalleristDrawing />}
      >
        Gallerist is a free tool for making Product Hunt gallery images in the browser. Instead of a blank canvas you start from{" "}
        <Claim k="layouts" ink="lemon">seven slide layouts</Claim>, each built for one job, like the opening hook or a big number.{" "}
        <Claim k="styles" ink="rose">Colours, paper finishes and type pairings</Claim> come with good defaults, and every slide{" "}
        <Claim k="size" ink="mint">exports at Product Hunt’s exact size</Claim>. There’s no sign-up and no watermark.
      </Project>
    </>
  );
}
