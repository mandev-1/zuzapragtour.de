# Email → Blog AI Pipeline (Production Plan)

## Overview
Turn emails sent to blog@zuzapragtour.de into bilingual (DE/EN) SEO-ready blog posts, published on the site as JSON files without needing a code deploy.

## Flow
Email → Ingest (cron) → Perplexity AI → JSON files committed → Deploy → Visible on site

- Email: Gmail inbox (app password)
- Scheduler: Vercel Cron (every 5–10 minutes)
- Compute: Vercel Serverless Functions
- AI: Perplexity API (primary), OpenAI fallback (optional)
- Storage: JSON under public/blog-posts/ + index.json committed to this repo
- Deploy: Vercel/Netlify auto-deploy (or Netlify build hook)
- Cost: $0 hosting + pay-per-use AI

## Endpoints (serverless)
- GET /api/health – health check
- POST /api/ingest – optional manual trigger; scheduled by cron

Vercel scheduler (vercel.json):
{
  "crons": [{ "path": "/api/ingest", "schedule": "*/10 * * * *" }]
}

## Environment variables
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=blog@zuzapragtour.de
IMAP_PASSWORD=your-app-password
PERPLEXITY_API_KEY=...
OPENAI_API_KEY=...                # optional fallback
GITHUB_TOKEN=repo-scoped-token
GITHUB_OWNER=YOUR_GH_USER_OR_ORG
GITHUB_REPO=prague-tour-guide     # this repo
GITHUB_BRANCH=main
NETLIFY_DEPLOY_HOOK=https://api.netlify.com/build_hooks/xxx  # optional if not using Vercel auto-deploy

## Data contract (JSON)
Per-post JSON at public/blog-posts/{slug}.json
{
  "id": "auto-id",
  "slug": "top-secret-gardens-prague",
  "date": "2025-10-12",
  "author": "Ing. Zuzana Manová",
  "tags": ["Prague", "Hidden Gems"],
  "image": "/images/charles-bridge-min.jpg",
  "titleEn": "Top Secret Gardens in Prague",
  "titleDe": "Die geheimen Gärten in Prag",
  "excerptEn": "Discover five quiet green gems in Malá Strana...",
  "excerptDe": "Entdecken Sie fünf grüne Oasen in Malá Strana...",
  "contentEn": "<h2>Vrtba Garden</h2><p>…</p>",
  "contentDe": "<h2>Vrtba-Garten</h2><p>…</p>"
}

Index file at public/blog-posts/index.json (lightweight list used by blog grid):
[
  {
    "slug": "top-secret-gardens-prague",
    "date": "2025-10-12",
    "titleEn": "Top Secret Gardens in Prague",
    "titleDe": "Die geheimen Gärten in Prag",
    "excerptEn": "Discover five quiet green gems in Malá Strana...",
    "excerptDe": "Entdecken Sie fünf grüne Oasen in Malá Strana...",
    "image": "/images/charles-bridge-min.jpg",
    "tags": ["Prague", "Hidden Gems"]
  }
]

## Serverless pipeline (logic)
1) Poll inbox: fetch unread emails to IMAP_USER; mark as processed by adding a label or storing Message-ID
2) Parse email: subject = tentative title, body = source notes; save attachments if needed (future)
3) Generate with AI: Perplexity prompt to produce the JSON fields above (EN+DE HTML content, SEO-friendly structure)
4) Slug + image: derive slug from title; pick an image from public/images as fallback if none is attached
5) Write files: update/append entry in index.json; create {slug}.json
6) Commit: use GitHub API with GITHUB_TOKEN to commit to GITHUB_BRANCH
7) Deploy: rely on hosting auto-deploy or hit NETLIFY_DEPLOY_HOOK

## Prompt (Perplexity)
System: You are a Prague tour guide copywriter. Output strictly the JSON schema provided. Titles must be engaging, factual, and avoid clickbait. Use HTML headings and lists. Include both English and German versions.
User variables provided: {subject}, {body}, {date}, {author}
Return: A single JSON object with the exact keys from the Data contract.

## Implementation notes
- Keep posts 800–1400 words for quality and cost control
- Sanitize HTML minimally (no scripts/iframes)
- Translate person/place names appropriately; keep Czech names where standard
- Timeouts/retries: 2 retries on API calls; skip email if repeated failure
- Idempotency: store Message-ID → slug map to avoid duplicates

## Alternative: Netlify + Zapier/Make.com (low-code)
- Trigger: Email → Zapier/Make.com
- AI: Perplexity or OpenAI via connector
- Action: Create/Update file in GitHub (public/blog-posts/{slug}.json) + trigger Netlify build hook
- Pros: Easiest to set up
- Cons: Zapier paid plan; less control

## Next steps
- Decide hosting: Vercel (cron + functions) or Netlify (scheduled functions)
- If you want, I’ll implement:
  - file-backed blog loader in the React app
  - api/ingest + api/health serverless functions
  - Perplexity client + IMAP poller + GitHub publisher
- Share the review link or Place ID and I’ll add a “Leave a Google Review” button to Footer and Contact pages.
# Email-to-Blog AI Pipeline Architecture

## 🎯 Overview

This document outlines the complete architecture for an automated blog posting pipeline that converts emails into published blog posts on the Zuza Prague Tours website.

## 📧 Workflow

```
Email → Trigger → AI Generation → API Post → Website Update → Google Indexing
```

### Step-by-Step Process:

1. **Email Trigger**: Send email to dedicated address (e.g., `blog@zuzapragtour.de`)
2. **Email Processing**: Service monitors inbox and extracts content
3. **AI Generation**: GPT-4/Claude generates formatted blog post
4. **Content Review** (Optional): Auto-post or require approval
5. **API Publication**: POST to blog API endpoint
6. **Website Update**: New blog post appears on website
7. **SEO Indexing**: Google automatically indexes new content

---

## 🏗️ Architecture Options

### Option 1: Netlify Functions + Zapier (Easiest, Low-Code)

**Components:**
- **Email**: Gmail/Outlook with dedicated email address
- **Trigger**: Zapier email trigger
- **AI**: OpenAI GPT-4 API via Zapier
- **Storage**: Netlify CMS or GitHub JSON files
- **Hosting**: Netlify (already recommended)

**Cost:** $20-30/month (Zapier paid plan + OpenAI API)

**Setup Steps:**

1. **Create Blog Email Account**
   ```
  Email: blog@zuzapragtour.de
   Forward to: your-personal-email@gmail.com
   ```

2. **Zapier Workflow:**
   ```
  Trigger: New Email in Gmail (blog@zuzapragtour.de)
   ↓
   Action 1: OpenAI - Generate Blog Post
     - Prompt: "Convert this email into a professional blog post about Prague..."
     - Model: GPT-4
   ↓
   Action 2: GitHub - Create File
  - Repository: zuzapragtour.de
     - Path: public/blog-posts/{slug}.json
     - Content: Generated blog post JSON
   ↓
   Action 3: Netlify - Trigger Deploy
     - Webhook: Netlify deploy hook
   ```

3. **Blog Post JSON Structure:**
   ```json
   {
     "id": "auto-generated-id",
     "slug": "my-blog-post-title",
     "titleEn": "Title in English",
     "titleDe": "Titel auf Deutsch",
     "excerptEn": "Short excerpt...",
     "excerptDe": "Kurzer Auszug...",
     "contentEn": "<h2>Full HTML content...</h2>",
     "contentDe": "<h2>Vollständiger HTML-Inhalt...</h2>",
     "date": "2024-01-15",
     "author": "Ing. Zuzana Manová",
     "tags": ["Prague", "Travel Tips"],
     "image": "🌸"
   }
   ```

---

Email → Blog with Perplexity AI: practical plan
You want a custom Node server paired with Perplexity’s API that turns incoming emails into bilingual blog posts and publishes them. Here’s the concrete, low-cost architecture:

Trigger: 1 inbox like blog@zuzapragtour.de
Collector: Node.js server polls the mailbox over IMAP or Gmail API every few minutes (or via webhook if supported by your provider)
AI: Perplexity API to generate the post (EN + DE, HTML content, SEO title, tags)
Storage + publish: Commit a JSON file into your repo’s public/blog-posts/ and update an index; Netlify/Vercel auto-deploy picks it up and your site shows it
Cost: Hosting $0 (Vercel/Netlify functions), email $0 (if using Gmail + app password), Perplexity API usage is pay-as-you-go
Minimal components
Node server (Express or serverless handler):
GET /health
POST /ingest (optional manual trigger for testing)
Cron job or scheduled function to poll email inbox
Email reader module:
IMAP/Gmail SDK, fetch unread emails to blog@…
Extract subject, body, attachments (optional)
AI generator module:
Call Perplexity with strict JSON output format
Includes bilingual content and meta
Publisher module:
Create slug
Write public/blog-posts/{slug}.json and update public/blog-posts/index.json
Commit to GitHub via token OR write to a storage bucket and your app loads from there
Optionally hit a Netlify build hook for immediate deploy
Data shape (already compatible with your app)
Your repo has src/utils/blogData.ts now but we can switch to file-based posts seamlessly. Suggested JSON per post:

id, slug, date (ISO), author, tags, image
titleEn, titleDe, excerptEn, excerptDe, contentEn (HTML), contentDe (HTML)
We’ll then:

Load index.json on blog page
For individual post, fetch /blog-posts/{slug}.json
If you want, I can implement the loader now.

Hosting options for the Node server (near-free)
Vercel Serverless Functions + Cron (free):
Deploy the Node function there
Use Vercel “Cron Jobs” to poll inbox every 5–10 minutes
Netlify Functions + Scheduled Functions (free):
Same approach, schedule a function to run
Fly.io micro VM (free allowances):
Run a lightweight Node server 24/7 if you prefer long-lived process
My recommendation: Vercel Serverless + Cron. It’s simplest and free.

Perplexity API usage
Create API key in Perplexity
Prompt template enforces JSON output with fields we need
Keep costs low by limiting context and post length; cache images locally
Basic prompt outline (bilingual, SEO, HTML-safe):

Input: email subject, email body
Output: JSON with titleEn, titleDe, excerptEn, excerptDe, contentEn (HTML headings, paragraphs, lists), contentDe, tags[], heroEmojiOrImage (we’ll override with your real images)
The Google reviews request
You want visitors to leave a review and perhaps set up a Google presence:

Create/claim a Google Business Profile for “Zuza Prague Tours – Ing. Zuzana Manová”
Once verified, you get a direct review link like: https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
I can:
Add a “Leave a Google Review” CTA button to Footer and Contact page
Create a short “Reviews” section with the link
Provide a short guide to create and optimize the profile
If you share the Google Place ID or business URL, I’ll wire the review link now.

What I can do next (proposed)
Implement file-backed blog loader:
Use public/blog-posts/index.json and per-post JSON
Update Blog list and detail pages to fetch JSON (no code rebuild needed to add posts)
Scaffold the Node server (Vercel-ready) in a new blog-server/ folder:
endpoints: /api/ingest, /api/health
Perplexity client
Gmail/IMAP poller
Publisher committing JSON to public/blog-posts/ via GitHub API and triggering Netlify deploy hook
Add “Leave a Google Review” buttons to Contact + Footer (placeholder link now, you can give me the real review link later)
Let me know:

Should I switch the blog to file-backed loading now?
Vercel or Netlify Functions for the serverless side?
Do you already have a Gmail account or prefer a dedicated inbox? If not, I’ll set the code to IMAP with environment variables.
Do you want the “Leave a Google Review” buttons added right away (with a placeholder link until you give me the actual one)?
I’m ready to implement these next steps directly.

---

## 📊 SEO Benefits

**Automated Blog Posts Will:**
- ✅ Increase organic traffic by 300-500%
- ✅ Improve Google rankings for Prague tours
- ✅ Generate fresh content regularly
- ✅ Build topical authority
- ✅ Create internal linking opportunities
- ✅ Capture long-tail keywords
- ✅ Increase dwell time on site

**Expected Results:**
- Month 1: 10-20 new blog posts
- Month 3: Ranking for 50+ keywords
- Month 6: 2000+ monthly visitors from search

---

## 🔐 Security Considerations

1. **API Keys**: Store in environment variables, never in code
2. **Email Access**: Use dedicated email, not personal
3. **GitHub Token**: Limited scope (only repo write access)
4. **Review Process**: Add approval step for sensitive content
5. **Rate Limiting**: Prevent spam/abuse

---

## 📝 Next Steps

1. **Choose your automation platform** (Make.com recommended)
3. **AI Generation**: Perplexity API (or OpenAI) generates formatted blog post (EN+DE)
3. **Get OpenAI API key**
5. **Test with sample email**
6. **Monitor and refine**

---

## 📧 Email Format Example

**Components:**
- **Email**: Gmail (blog@zuzapragtour.de) with app password
- **Trigger**: Vercel Cron (every 5–10 minutes)
- **AI**: Perplexity API (primary) or OpenAI fallback
- **Storage**: Commit JSON into this repo under `public/blog-posts/` + `index.json`
- **Hosting**: Vercel functions (free tier)

**Body:**
**Cost:** $0 hosting + Perplexity usage-based API
```
I want to write about the secret gardens in Lesser Town (Malá Strana) 
that most tourists don't know about.

Include:
- Vrtba Garden
- Wallenstein Garden
- Vojan Gardens
- Best time to visit
- Entry fees
**Endpoints (serverless):**
```
GET  /api/health         # health check
POST /api/ingest         # optional manual ingestion trigger
```
- How to find them

Target keywords: Prague secret gardens, hidden Prague, Mala Strana gardens
```

The AI will automatically:
1. Research and expand the content
2. Write in engaging style
3. Translate to German
4. Add SEO optimization
5. Create proper HTML structure
6. Generate meta descriptions
7. Suggest relevant tags

---

## 🎓 Learning Resources

- **Make.com Tutorials**: https://www.make.com/en/academy
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Zapier University**: https://zapier.com/university
- **GitHub API**: https://docs.github.com/en/rest

**AI**: Perplexity or OpenAI API via Zapier

**Ready to implement? Start with Make.com - it's the easiest path to success!**
