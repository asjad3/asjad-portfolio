import Image from "next/image";
import chatlySheets from "@/assets/shots/chatly-sheets.webp";
import galleristShot from "@/assets/shots/gallerist.webp";
import sheetsPlate from "@/assets/plates/sheets.webp";
import timeforkPlate from "@/assets/plates/timefork.webp";
import galleristPlate from "@/assets/plates/gallerist.webp";
import { Living } from "@/components/Living";

// Figures shared by the home page and the project pages.

const half = "(max-width: 960px) 100vw, 50vw";

export function SheetsShot() {
  return (
    <figure className="frame">
      <div className="shot">
        <Image src={chatlySheets} alt="The AI Sheets page: a prompt box in Sheets mode above a grid of workbook templates." sizes={half} />
      </div>
      <figcaption>
        <a className="link" href="https://chatly.ai/agent/sheets">
          chatly.ai/agent/sheets
        </a>
      </figcaption>
    </figure>
  );
}

export function SheetsDrawing() {
  return (
    <Living still={sheetsPlate} alt="Pencil drawing of a one-line prompt above an exploded stack of spreadsheet layers and a bar chart." sizes={half} />
  );
}

export function TimeforkCode() {
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
        <span className="ln">
          {"    "}clonefile(s.as_ptr(), d.as_ptr(), CLONE_NOFOLLOW)
        </span>
        <span className="ln">{"};"}</span>
      </pre>
    </figure>
  );
}

export function TimeforkBench() {
  return (
    <figure className="frame">
      <table className="bench">
        <tbody>
          <tr>
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

export function TimeforkDrawing() {
  return (
    <Living still={timeforkPlate} alt="Pencil drawing of a stack of identical project snapshots, one of which branches into four copies." sizes={half} />
  );
}

export function GalleristShot() {
  return (
    <figure className="frame">
      <div className="shot">
        <Image src={galleristShot} alt="The Gallerist editor: slide layouts on the left, the slide in the middle, colour, finish and type options on the right." sizes={half} />
      </div>
      <figcaption>
        <a className="link" href="https://galleristapp.vercel.app">galleristapp.vercel.app</a>
      </figcaption>
    </figure>
  );
}

export function GalleristDrawing() {
  return (
    <Living still={galleristPlate} alt="Pencil drawing of seven empty frames hung together on a gallery wall, with a visitor for scale." sizes={half} />
  );
}
