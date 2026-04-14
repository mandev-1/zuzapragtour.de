import type { Config, Context } from "@netlify/edge-functions";
import routeMeta from "./route-meta.json" with { type: "json" };
import routeContent from "./route-content.json" with { type: "json" };

interface RouteMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  canonical: string;
  ogType: string;
  articleAuthor?: string;
  articleDate?: string;
}

interface RouteContent {
  title: string;
  html: string;
  author: string;
  date: string;
  image: string;
}

function lookupMeta(pathname: string): RouteMeta | null {
  const staticMeta = (routeMeta as any).static as Record<string, RouteMeta>;
  const blogMeta = (routeMeta as any).blog as Record<string, RouteMeta>;

  // Exact match for static routes
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  if (staticMeta[normalizedPath]) {
    return staticMeta[normalizedPath];
  }

  // Blog post: /blog/:slug
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (blogMeta[slug]) {
      return blogMeta[slug];
    }
  }

  return null;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function rewriteTag(
  html: string,
  pattern: RegExp,
  replacement: string
): string {
  return html.replace(pattern, replacement);
}

export default async function handler(
  request: Request,
  context: Context
): Promise<Response | void> {
  const url = new URL(request.url);
  const meta = lookupMeta(url.pathname);

  // Always fetch the response so we can inject at minimum a canonical
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  let html = await response.text();

  // When there's no route-meta entry, just ensure the canonical matches the
  // actual URL being served — prevents Google flagging the SPA shell as a
  // duplicate of every other page.
  if (!meta) {
    const fallbackCanonical = `https://zuzapragtour.de${url.pathname.replace(/\/$/, "") || "/"}`;
    if (html.includes('rel="canonical"')) {
      html = rewriteTag(
        html,
        /<link[^>]*rel="canonical"\s+href="[^"]*"[^>]*\/?>/,
        `<link data-rh="true" rel="canonical" href="${escapeHtml(fallbackCanonical)}" />`
      );
    } else {
      html = html.replace(
        "</head>",
        `  <link data-rh="true" rel="canonical" href="${escapeHtml(fallbackCanonical)}" />\n</head>`
      );
    }
    const fallbackHeaders = new Headers(response.headers);
    fallbackHeaders.delete("content-length");
    return new Response(html, { status: response.status, headers: fallbackHeaders });
  }

  const safeTitle = escapeHtml(meta.title);
  const safeDesc = escapeHtml(meta.description);
  const safeOgTitle = escapeHtml(meta.ogTitle);
  const safeOgDesc = escapeHtml(meta.ogDescription);

  // <title>
  html = rewriteTag(html, /<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

  // <meta name="description"> — replace if present (with or without data-rh), otherwise inject
  if (/<meta[\s\S]*?name="description"/.test(html)) {
    html = rewriteTag(
      html,
      /<meta[^>]*name="description"\s+content="[^"]*"[^>]*\/?>/,
      `<meta data-rh="true" name="description" content="${safeDesc}" />`
    );
  } else {
    html = html.replace(
      "</head>",
      `  <meta data-rh="true" name="description" content="${safeDesc}" />\n</head>`
    );
  }

  // og:type
  html = rewriteTag(
    html,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`
  );

  // og:url
  html = rewriteTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(meta.ogUrl)}" />`
  );

  // og:title
  html = rewriteTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${safeOgTitle}" />`
  );

  // og:description
  html = rewriteTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${safeOgDesc}" />`
  );

  // og:image
  html = rewriteTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`
  );

  // twitter:title
  html = rewriteTag(
    html,
    /<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="twitter:title" content="${safeOgTitle}" />`
  );

  // twitter:description
  html = rewriteTag(
    html,
    /<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="twitter:description" content="${safeOgDesc}" />`
  );

  // twitter:url
  html = rewriteTag(
    html,
    /<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="twitter:url" content="${escapeHtml(meta.ogUrl)}" />`
  );

  // twitter:image
  html = rewriteTag(
    html,
    /<meta\s+property="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="twitter:image" content="${escapeHtml(meta.ogImage)}" />`
  );

  // Add canonical link if not present, or replace existing (handles data-rh attribute)
  if (html.includes('rel="canonical"')) {
    html = rewriteTag(
      html,
      /<link[^>]*rel="canonical"\s+href="[^"]*"[^>]*\/?>/,
      `<link data-rh="true" rel="canonical" href="${escapeHtml(meta.canonical)}" />`
    );
  } else {
    html = html.replace(
      "</head>",
      `  <link data-rh="true" rel="canonical" href="${escapeHtml(meta.canonical)}" />\n</head>`
    );
  }

  // For article pages, add article meta tags
  if (meta.ogType === "article") {
    if (meta.articleAuthor && !html.includes('property="article:author"')) {
      html = html.replace(
        "</head>",
        `  <meta property="article:author" content="${escapeHtml(meta.articleAuthor)}" />\n</head>`
      );
    }
    if (meta.articleDate && !html.includes('property="article:published_time"')) {
      html = html.replace(
        "</head>",
        `  <meta property="article:published_time" content="${escapeHtml(meta.articleDate)}" />\n</head>`
      );
    }
  }

  // ── Static article injection ─────────────────────────────────────────────
  // Inject the full article HTML into <div id="root"> so crawlers (Bingbot,
  // Googlebot first-pass, etc.) see real content without executing JavaScript.
  // React's createRoot().render() will completely replace this on page load —
  // browsers experience zero side-effects, crawlers get full article text.
  if (meta.ogType === "article") {
    const blogSlug = url.pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
    if (blogSlug) {
      const content = (routeContent as Record<string, RouteContent>)[blogSlug];
      if (content?.html) {
        const safeArticleTitle = escapeHtml(content.title || meta.title);
        const safeAuthor = escapeHtml(content.author || "");
        const safeDate = escapeHtml(content.date || "");
        const safeImage = escapeHtml(content.image || meta.ogImage);

        const staticArticle = [
          `<article id="ssr-content" style="max-width:800px;margin:2rem auto;padding:1rem 1.5rem;font-family:Georgia,serif;line-height:1.75;color:#1a1a1a">`,
          `<h1 style="font-size:1.9rem;font-weight:700;margin-bottom:1rem;line-height:1.3">${safeArticleTitle}</h1>`,
          safeAuthor || safeDate
            ? `<p style="font-size:0.9rem;color:#666;margin-bottom:1.5rem">${safeAuthor}${safeAuthor && safeDate ? " &middot; " : ""}${safeDate}</p>`
            : "",
          safeImage
            ? `<img src="${safeImage}" alt="${safeArticleTitle}" style="width:100%;max-height:420px;object-fit:cover;border-radius:8px;margin-bottom:1.5rem" loading="eager" />`
            : "",
          `<div class="blog-content">`,
          content.html,
          `</div>`,
          `</article>`,
        ].join("\n");

        html = html.replace(
          /<div id="root"><\/div>/,
          `<div id="root">${staticArticle}</div>`
        );
      }
    }
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(html, {
    status: response.status,
    headers,
  });
}

export const config: Config = {
  path: "/*",
  excludedPath: [
    "/static/*",
    "/images/*",
    "/stitch-exports/*",
    "/*.js",
    "/*.css",
    "/*.json",
    "/*.xml",
    "/*.txt",
    "/*.ico",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.webp",
    "/*.gif",
    "/*.svg",
    "/*.woff",
    "/*.woff2",
    "/*.map",
  ],
};
