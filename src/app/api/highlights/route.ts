import { NextResponse } from "next/server";
import {
  addHighlight,
  allowPost,
  clean,
  listHighlights,
  newHighlight,
  normalise,
  removeHighlight,
  storageReady,
  textOfPage,
  type Draft,
} from "@/lib/highlights";

export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    return NextResponse.json({ highlights: await listHighlights(), ready: storageReady }, { headers: noStore });
  } catch {
    return NextResponse.json({ highlights: [], ready: false }, { headers: noStore });
  }
}

export async function POST(request: Request) {
  if (!storageReady) return NextResponse.json({ error: "Highlights aren’t switched on yet." }, { status: 503 });

  const body = (await request.json().catch(() => null)) as Draft | null;
  if (!body) return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });

  const fields = clean(body);
  if ("error" in fields) return NextResponse.json(fields, { status: 400 });

  const origin = new URL(request.url).origin;
  const pageText = await textOfPage(origin, fields.path).catch(() => "");
  if (!pageText.includes(normalise(fields.quote))) {
    return NextResponse.json({ error: "That phrase isn’t on the page. Select text straight from the site." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  if (!(await allowPost(ip))) {
    return NextResponse.json({ error: "That’s a lot of highlighting. Try again in an hour." }, { status: 429 });
  }

  const highlight = newHighlight(fields, request.headers);
  await addHighlight(highlight);
  return NextResponse.json({ highlight }, { status: 201, headers: noStore });
}

/** Remove a highlight: DELETE /api/highlights?id=… with "Authorization: Bearer $HIGHLIGHTS_ADMIN_TOKEN". */
export async function DELETE(request: Request) {
  const token = process.env.HIGHLIGHTS_ADMIN_TOKEN;
  if (!token || request.headers.get("authorization") !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  return NextResponse.json({ removed: await removeHighlight(id) });
}
