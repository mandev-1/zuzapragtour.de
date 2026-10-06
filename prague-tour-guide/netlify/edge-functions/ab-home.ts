// Homepage A/B test (see src/config/abTest.ts): A = today's homepage,
// B = the new mobile homepage. Runs only for GET `/` — Netlify Forms POST to
// `/` and must pass untouched.
//
// - Assigns a variant 50/50 and keeps it for 60 days in the `zpt_ab` cookie.
// - Adds data-ab="a|b" to <html>; CSS shows the matching homepage before the
//   first paint, so there is no flicker and one static HTML serves both.
// - Crawlers and Lighthouse get variant A and no cookie.
// - `?ab=a` / `?ab=b` forces a variant for previewing; it also sets
//   `zpt_ab_qa`, which keeps these visits out of the counts (`?ab=off` clears).
//
// To stop the test, set ENABLED = false: everyone sees A again.
import type { Config, Context } from "@netlify/edge-functions";

const ENABLED = true;
const COOKIE = "zpt_ab";
const QA_COOKIE = "zpt_ab_qa";
const MAX_AGE = 60 * 60 * 24 * 60;
const BOT = /bot|crawl|spider|slurp|lighthouse|pagespeed|headless|facebookexternalhit|embedly|preview/i;

type Variant = "a" | "b";
const isVariant = (v: unknown): v is Variant => v === "a" || v === "b";

export default async (request: Request, context: Context) => {
  if (!ENABLED || request.method !== "GET") return;
  // Page loads only (not prefetches or data requests).
  if (!(request.headers.get("accept") ?? "").includes("text/html")) return;

  const param = new URL(request.url).searchParams.get("ab");
  const ua = request.headers.get("user-agent") ?? "";
  if (!param && BOT.test(ua)) return;

  const stored = context.cookies.get(COOKIE);
  const cookies: string[] = [];
  let qa = context.cookies.get(QA_COOKIE) === "1";
  let variant: Variant;

  if (param === "off") {
    // Leave preview mode: forget the forced variant, draw a fresh one.
    cookies.push(`${QA_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; Secure`);
    qa = false;
    variant = Math.random() < 0.5 ? "a" : "b";
  } else if (isVariant(param)) {
    variant = param;
    if (!qa) cookies.push(`${QA_COOKIE}=1; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax; Secure`);
    qa = true;
  } else {
    variant = isVariant(stored) ? stored : Math.random() < 0.5 ? "a" : "b";
  }
  if (variant !== stored) cookies.push(`${COOKIE}=${variant}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax; Secure`);

  const response = await context.next();
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;

  const attrs = `data-ab="${variant}"${qa ? ' data-ab-qa="1"' : ""}`;
  const html = (await response.text()).replace("<html", `<html ${attrs}`);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  // The HTML now differs per visitor: never store it in a shared cache.
  headers.set("cache-control", "private, no-cache");
  for (const c of cookies) headers.append("set-cookie", c);
  return new Response(html, { status: response.status, headers });
};

export const config: Config = {
  path: "/",
  method: ["GET"],
};
