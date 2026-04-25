from collections import defaultdict


def aggregate_by_query(rows: list) -> dict:
    data = defaultdict(lambda: {"clicks": 0, "impressions": 0, "position_sum": 0, "count": 0})
    for row in rows:
        q = row["keys"][0]
        data[q]["clicks"] += row["clicks"]
        data[q]["impressions"] += row["impressions"]
        data[q]["position_sum"] += row["position"]
        data[q]["count"] += 1
    result = {}
    for q, d in data.items():
        result[q] = {
            "clicks": d["clicks"],
            "impressions": d["impressions"],
            "ctr": d["clicks"] / d["impressions"] if d["impressions"] else 0,
            "position": d["position_sum"] / d["count"],
        }
    return result


def aggregate_by_page(rows: list) -> dict:
    data = defaultdict(lambda: {"clicks": 0, "impressions": 0})
    for row in rows:
        page = row["keys"][1]
        data[page]["clicks"] += row["clicks"]
        data[page]["impressions"] += row["impressions"]
    return dict(data)


def compare_periods(current: list, previous: list) -> dict:
    cur_q = aggregate_by_query(current)
    prev_q = aggregate_by_query(previous)

    drops, gains, opportunities, new_queries = [], [], [], []

    for q, stats in cur_q.items():
        if q not in prev_q:
            if stats["impressions"] > 10:
                new_queries.append({"query": q, **stats})
            continue
        prev = prev_q[q]
        delta = stats["position"] - prev["position"]
        if delta > 3:
            drops.append({"query": q, "position_delta": round(delta, 1), **stats})
        elif delta < -3:
            gains.append({"query": q, "position_delta": round(delta, 1), **stats})
        if stats["impressions"] > 50 and stats["ctr"] < 0.03:
            opportunities.append({"query": q, **stats})

    cur_pages = aggregate_by_page(current)

    return {
        "drops": sorted(drops, key=lambda x: x["position_delta"], reverse=True)[:10],
        "gains": sorted(gains, key=lambda x: x["position_delta"])[:10],
        "opportunities": sorted(opportunities, key=lambda x: x["impressions"], reverse=True)[:10],
        "new_queries": sorted(new_queries, key=lambda x: x["impressions"], reverse=True)[:10],
        "top_queries": sorted(cur_q.items(), key=lambda x: x[1]["clicks"], reverse=True)[:10],
        "top_pages": sorted(cur_pages.items(), key=lambda x: x[1]["clicks"], reverse=True)[:10],
        "total_clicks": sum(r["clicks"] for r in current),
        "total_impressions": sum(r["impressions"] for r in current),
        "prev_clicks": sum(r["clicks"] for r in previous),
        "prev_impressions": sum(r["impressions"] for r in previous),
    }
