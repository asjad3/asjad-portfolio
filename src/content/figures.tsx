import Image from "next/image";
import chatlySheets from "@/assets/shots/chatly-sheets.webp";
import galleristShot from "@/assets/shots/gallerist.webp";
import sheetsPlate from "@/assets/plates/sheets.webp";
import timeforkPlate from "@/assets/plates/timefork.webp";
import galleristPlate from "@/assets/plates/gallerist.webp";
import { Mark } from "@/components/ink";
import { Living } from "@/components/Living";

// Figures shared by the home page and the project pages.
// With `marks`, highlighter swipes pair parts of the image with phrases in the text.

const half = "(max-width: 960px) 100vw, 50vw";

export function SheetsShot({ marks = true }: { marks?: boolean }) {
  return (
    <figure className="frame">
      <div className="shot dark">
        <Image src={chatlySheets} alt="The AI Sheets page: a prompt box in Sheets mode above a grid of workbook templates." sizes={half} />
        {marks && <Mark k="prompt" ink="lemon" box={[32, 28.5, 54, 12.5]} />}
        {marks && <Mark k="sheets" ink="rose" box={[32, 47.5, 54, 52]} />}
      </div>
      <figcaption>
        <a className="link" href="https://chatly.ai/agent/sheets" {...(marks ? { "data-ev": "live", "data-ink": "mint" } : {})}>
          chatly.ai/agent/sheets
        </a>
      </figcaption>
    </figure>
  );
}

export function SheetsDrawing({ marks = true }: { marks?: boolean }) {
  return (
    <Living still={sheetsPlate} alt="Pencil drawing of a one-line prompt above an exploded stack of spreadsheet layers and a bar chart." sizes={half}>
      {marks && <Mark k="prompt" ink="lemon" box={[30, 1, 39, 10]} />}
      {marks && <Mark k="sheets" ink="rose" box={[23, 14, 53, 84]} />}
    </Living>
  );
}

export function TimeforkCode({ marks = true }: { marks?: boolean }) {
  return (
    <figure className="frame">
      <figcaption className="head">
        <span>src/clone.rs</span>
        <a className="link" href="https://github.com/asjad3/timefork/blob/main/src/clone.rs">View on GitHub</a>
      </figcaption>
      <pre className="code">
        <span className="ln">
          <span className="k">let</span> rc = <span className="k">unsafe</span> {"{"}
        </span>
        <span className="ln" {...(marks ? { "data-ev": "cow", "data-ink": "rose" } : {})}>
          {"    "}clonefile(s.as_ptr(), d.as_ptr(), CLONE_NOFOLLOW)
        </span>
        <span className="ln">{"};"}</span>
      </pre>
    </figure>
  );
}

export function TimeforkBench({ marks = true }: { marks?: boolean }) {
  return (
    <figure className="frame">
      <table className="bench">
        <tbody>
          <tr {...(marks ? { "data-ev": "speed", "data-ink": "sky" } : {})}>
            <td>Snapshot the whole project</td>
            <td>0.9 s</td>
          </tr>
          <tr>
            <td>Fork it to a new folder</td>
            <td>1.0 s</td>
          </tr>
          <tr>
            <td>Restore an earlier snapshot</td>
            <td>3.0 s</td>
          </tr>
          <tr>
            <td>Extra disk used after 4 snapshots and 1 fork</td>
            <td>~0</td>
          </tr>
        </tbody>
      </table>
      <figcaption>
        <span>18 GB project, 78,000 files, Apple M4, APFS</span>
      </figcaption>
    </figure>
  );
}

export function TimeforkDrawing({ marks = true }: { marks?: boolean }) {
  return (
    <Living still={timeforkPlate} alt="Pencil drawing of a stack of identical project snapshots, one of which branches into four copies." sizes={half}>
      {marks && <Mark k="before" ink="lemon" box={[5, 10, 24, 81]} />}
    </Living>
  );
}

export function GalleristShot({ marks = true }: { marks?: boolean }) {
  return (
    <figure className="frame">
      <div className="shot">
        <Image src={galleristShot} alt="The Gallerist editor: slide layouts on the left, the slide in the middle, colour, finish and type options on the right." sizes={half} />
        {marks && <Mark k="size" ink="mint" box={[55.4, 1.2, 17.2, 4]} />}
        {marks && <Mark k="layouts" ink="lemon" box={[82.6, 8, 16.4, 22.6]} />}
        {marks && <Mark k="styles" ink="rose" box={[82.6, 32, 16.6, 52]} />}
      </div>
      <figcaption>
        <a className="link" href="https://galleristapp.vercel.app">galleristapp.vercel.app</a>
      </figcaption>
    </figure>
  );
}

export function GalleristDrawing({ marks = true }: { marks?: boolean }) {
  return (
    <Living still={galleristPlate} alt="Pencil drawing of seven empty frames hung together on a gallery wall, with a visitor for scale." sizes={half}>
      {marks && <Mark k="layouts" ink="lemon" box={[21, 5, 58, 75]} />}
    </Living>
  );
}
