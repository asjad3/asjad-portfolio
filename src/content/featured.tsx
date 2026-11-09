import { Project } from "@/components/Project";
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
        actions={[
          { label: "Try AI Sheets", href: "https://chatly.ai/agent/sheets" },
          { label: "More about AI Sheets", href: "/work/ai-sheets" },
        ]}
        proof={<SheetsShot />}
        drawing={<SheetsDrawing />}
      >
        AI Sheets builds a spreadsheet from a single prompt, with
        formulas, pivot tables and charts across several sheets. I led it from the first prototype to
        launch. Early on we chose to license a spreadsheet engine instead of building our own, so the team
        could spend its time on the AI that writes the workbooks.
      </Project>

      <Project
        id="timefork"
        name="timefork"
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
        timefork, an open-source tool I wrote in Rust, snapshots the whole project folder
        before each change an agent makes,
        using the file system’s copy-on-write clones, so you can go back to any point or branch from it.
        On an 18 GB project a snapshot takes 0.9 seconds and almost no extra disk space.
      </Project>

      <Project
        id="gallerist"
        name="Gallerist"
        actions={[
          { label: "Open Gallerist", href: "https://galleristapp.vercel.app" },
          { label: "More about Gallerist", href: "/work/gallerist" },
        ]}
        proof={<GalleristShot />}
        drawing={<GalleristDrawing />}
      >
        Gallerist is a free tool for making Product Hunt gallery images in the browser. Instead of a blank canvas you start from
        seven slide layouts, each built for one job, like the opening hook or a big number.
        Colours, paper finishes and type pairings come with good defaults, and every slide
        exports at Product Hunt’s exact size. There’s no sign-up and no watermark.
      </Project>
    </>
  );
}
