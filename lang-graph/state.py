from typing import TypedDict, Optional


class SEOState(TypedDict):
    site_url: str
    days: int
    current: list
    previous: list
    analysis: dict
    report: str
    delivered: bool
    error: Optional[str]
