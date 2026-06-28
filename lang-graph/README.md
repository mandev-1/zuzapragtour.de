# SEO Agent — zuzapragtour.de

LangGraph agent that pulls Google Search Console data, analyzes performance vs the previous period, generates a Claude-written brief, and emails it to you.

**What you get in your inbox:** clicks/impressions delta, top queries, ranking drops, high-impression/low-CTR quick wins, new queries breaking through, and one recommended action for the week.

---

## Prerequisites

- Python 3.12+
- Docker (for containerized runs)
- A Google Cloud service account with Search Console API enabled
- The service account email added as a user in GSC for `zuzapragtour.de`
- A Gmail App Password (not your regular password)
- An Anthropic API key

---

## One-time setup

### 1. Google Cloud service account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project (or reuse one)
3. Enable the **Google Search Console API**
4. IAM & Admin → Service Accounts → Create service account
5. Create a JSON key and save it as `credentials/service-account.json`
6. Go to [search.google.com/search-console](https://search.google.com/search-console) → Settings → Users and permissions → Add user → paste the service account email, set role to **Full**

### 2. Gmail App Password

1. Google Account → Security → 2-Step Verification → App passwords
2. Create one named "seo-agent", copy it — this is your `SMTP_PASSWORD`

### 3. Configure environment

```bash
cp .env.example .env
# fill in your values
```

| Key | Value |
|---|---|
| `GSC_SITE_URL` | `sc-domain:zuzapragtour.de` |
| `GSC_SERVICE_ACCOUNT_PATH` | `./credentials/service-account.json` |
| `REPORT_EMAIL` | where to send the report |
| `REPORT_DAYS` | lookback window, default `28` |
| `SMTP_USER` | your Gmail address |
| `SMTP_PASSWORD` | Gmail App Password from step 2 |
| `SMTP_FROM` | your Gmail address |
| `ANTHROPIC_API_KEY` | from console.anthropic.com |

---

## Run locally

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

Output prints to terminal and sends the report by email.

---

## Run with Docker

```bash
# one-off run
docker compose run seo-agent

# schedule weekly via cron (every Monday 8am)
crontab -e
# add: 0 8 * * 1 cd /path/to/lang-graph && docker compose run seo-agent
```

---

## Deploy to Railway

1. Push this folder to a GitHub repo
2. New project on [railway.app](https://railway.app) → Deploy from GitHub repo
3. Add all `.env` values as Railway environment variables
4. For the service account JSON: either use a Railway volume and set `GSC_SERVICE_ACCOUNT_PATH` to the mount path, or inline the JSON as a single env var `GSC_SERVICE_ACCOUNT_JSON` and update `gsc.py` to use `google.oauth2.service_account.Credentials.from_service_account_info(json.loads(os.environ["GSC_SERVICE_ACCOUNT_JSON"]))`
5. Set a Railway cron: `0 8 * * 1`

---

## File structure

```
state.py        agent state shape (SEOState)
gsc.py          Search Console API client + date helpers
analysis.py     period comparison, drops/gains/opportunities
report.py       Claude-generated markdown brief
email_send.py   Gmail SMTP delivery
graph.py        LangGraph graph wiring all nodes together
main.py         entry point
```
