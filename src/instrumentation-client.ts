// PostHog analytics. Off unless NEXT_PUBLIC_POSTHOG_KEY is set. Loaded after the page is idle so it never
// competes with first paint, and sent through /ingest on this domain (see next.config.ts) so blockers
// that match posthog.com don't drop it.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  const start = () =>
    import("posthog-js").then(({ default: posthog }) =>
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "https://eu.posthog.com" : "https://us.posthog.com",
        defaults: "2026-08-30",
      }),
    );
  if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 3000 });
  else setTimeout(start, 1500);
}
