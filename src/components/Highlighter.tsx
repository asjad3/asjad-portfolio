"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Ink = "lemon" | "rose" | "mint" | "sky";
const INKS: { id: Ink; label: string }[] = [
  { id: "lemon", label: "Yellow" },
  { id: "rose", label: "Pink" },
  { id: "mint", label: "Green" },
  { id: "sky", label: "Blue" },
];

type Picked = { quote: string; x: number; top: number; bottom: number; range: Range };

/** Select any line inside [data-highlightable] to highlight it and leave a short note. */
export function Highlighter() {
  const [picked, setPicked] = useState<Picked | null>(null);
  const [open, setOpen] = useState(false);
  const [ink, setInk] = useState<Ink>("lemon");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const noteRef = useRef<HTMLInputElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  const read = useCallback(() => {
    if (openRef.current) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return setPicked(null);
    const range = sel.getRangeAt(0);
    const host = (n: Node) => (n.nodeType === Node.ELEMENT_NODE ? (n as Element) : n.parentElement)?.closest("[data-highlightable]");
    const start = host(range.startContainer);
    if (!start || start !== host(range.endContainer)) return setPicked(null);
    const quote = sel.toString().replace(/\s+/g, " ").trim();
    if (quote.length < 3 || quote.length > 160) return setPicked(null);
    const r = range.getBoundingClientRect();
    setPicked({ quote, x: r.left + r.width / 2 + scrollX, top: r.top + scrollY, bottom: r.bottom + scrollY, range: range.cloneRange() });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setPicked(null);
    setNote("");
    setState("idle");
    setMessage("");
  }, []);

  useEffect(() => {
    let t = 0;
    const onChange = () => {
      clearTimeout(t);
      t = window.setTimeout(read, 180);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("selectionchange", onChange);
    addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("selectionchange", onChange);
      removeEventListener("keydown", onKey);
    };
  }, [read, close]);

  useEffect(() => {
    if (open) noteRef.current?.focus({ preventScroll: true });
  }, [open]);

  async function post(e: React.FormEvent) {
    e.preventDefault();
    if (!picked || state === "sending") return;
    setState("sending");
    setMessage("");
    const res = await fetch("/api/highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote: picked.quote, note, ink, path: location.pathname, website: trapRef.current?.value ?? "" }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (!res || !res.ok) {
      setState("error");
      setMessage(data.error ?? "Couldn’t save that. Try again in a moment.");
      return;
    }
    // Ink the phrase in place when it sits inside a single run of text.
    try {
      const r = picked.range;
      if (r.startContainer === r.endContainer && r.startContainer.nodeType === Node.TEXT_NODE) {
        const mark = document.createElement("mark");
        mark.className = "visitor";
        mark.dataset.ink = ink;
        r.surroundContents(mark);
      }
    } catch {}
    window.getSelection()?.removeAllRanges();
    window.dispatchEvent(new CustomEvent("highlight:posted", { detail: data.highlight }));
    setState("done");
    setMessage(location.pathname === "/" ? "Saved. It’s in the list at the bottom of this page." : "Saved. You’ll find it at the bottom of the home page.");
    setTimeout(close, 2200);
  }

  if (!picked) return null;

  if (!open) {
    return (
      <button
        type="button"
        className="hl-trigger"
        style={{ left: picked.x, top: picked.top - 52 }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen(true)}
      >
        <i aria-hidden="true" />
        Highlight
      </button>
    );
  }

  const left = Math.min(Math.max(picked.x - 180, 12), document.documentElement.clientWidth - 372);
  return (
    <form className="hl-pop" style={{ left, top: picked.bottom + 12 }} onSubmit={post} aria-label="Highlight this phrase">
      <p className="hl-quote">
        <mark className="ink" data-ink={ink}>{picked.quote}</mark>
      </p>
      <fieldset className="hl-inks">
        <legend className="sr-only">Colour</legend>
        {INKS.map((i) => (
          <span key={i.id}>
            <input type="radio" id={`hl-${i.id}`} name="ink" value={i.id} checked={ink === i.id} onChange={() => setInk(i.id)} />
            <label htmlFor={`hl-${i.id}`} data-ink={i.id}>
              <span className="sr-only">{i.label}</span>
            </label>
          </span>
        ))}
      </fieldset>
      <label className="sr-only" htmlFor="hl-note">
        Note
      </label>
      <input
        ref={noteRef}
        id="hl-note"
        type="text"
        maxLength={120}
        placeholder="Add a note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        autoComplete="off"
      />
      <input ref={trapRef} className="trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="hl-row">
        <small>Posted publicly with your city.</small>
        <button type="button" className="btn" onClick={close}>
          Cancel
        </button>
        <button type="submit" className="btn primary" disabled={state === "sending" || state === "done"}>
          {state === "sending" ? "Posting…" : "Post"}
        </button>
      </div>
      {message ? (
        <p className={state === "error" ? "hl-msg error" : "hl-msg"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
