import os
from datetime import date, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def gsc_client():
    creds = service_account.Credentials.from_service_account_file(
        os.environ["GSC_SERVICE_ACCOUNT_PATH"], scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds)


def date_range(days_ago_end: int, days: int) -> tuple[str, str]:
    end = date.today() - timedelta(days=days_ago_end)
    start = end - timedelta(days=days)
    return start.isoformat(), end.isoformat()


def fetch_performance(client, site_url: str, start: str, end: str) -> list:
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query", "page"],
        "rowLimit": 500,
    }
    resp = client.searchanalytics().query(siteUrl=site_url, body=body).execute()
    return resp.get("rows", [])
