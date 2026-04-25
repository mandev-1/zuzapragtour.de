import anthropic
from datetime import date


def generate_report(analysis: dict, site_url: str, days: int) -> str:
    client = anthropic.Anthropic()

    clicks_delta = analysis["total_clicks"] - analysis["prev_clicks"]
    impressions_delta = analysis["total_impressions"] - analysis["prev_impressions"]

    prompt = f"""You are an SEO analyst. Write a concise performance report for {site_url}.
Period: last {days} days vs previous {days} days. Today: {date.today().isoformat()}.

Stats:
- Clicks: {analysis['total_clicks']} ({clicks_delta:+d} vs previous)
- Impressions: {analysis['total_impressions']} ({impressions_delta:+d} vs previous)
- Top queries by clicks: {analysis['top_queries'][:5]}
- Top pages by clicks: {analysis['top_pages'][:5]}
- Ranking drops (position worsened >3 places): {analysis['drops'][:5]}
- Ranking gains: {analysis['gains'][:5]}
- Opportunities (>50 impressions, <3% CTR): {analysis['opportunities'][:5]}
- New queries breaking through: {analysis['new_queries'][:5]}

Write a markdown report with these sections:
## Summary
## What's Working
## Concerns
## Quick Wins
## Recommended Action This Week

Be direct and specific. No fluff. Keep it under 400 words."""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text
