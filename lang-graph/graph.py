import os
from langgraph.graph import StateGraph, END
from state import SEOState
from gsc import gsc_client, date_range, fetch_performance
from analysis import compare_periods
from report import generate_report
from email_send import send_email


def node_fetch(state: SEOState) -> SEOState:
    try:
        client = gsc_client()
        cur_start, cur_end = date_range(3, state["days"])
        prev_start, prev_end = date_range(3 + state["days"], state["days"])
        current = fetch_performance(client, state["site_url"], cur_start, cur_end)
        previous = fetch_performance(client, state["site_url"], prev_start, prev_end)
        return {**state, "current": current, "previous": previous}
    except Exception as e:
        return {**state, "error": str(e)}


def node_analyze(state: SEOState) -> SEOState:
    analysis = compare_periods(state["current"], state["previous"])
    return {**state, "analysis": analysis}


def node_report(state: SEOState) -> SEOState:
    report = generate_report(state["analysis"], state["site_url"], state["days"])
    return {**state, "report": report}


def node_deliver(state: SEOState) -> SEOState:
    send_email(
        to=os.environ["REPORT_EMAIL"],
        subject=f"SEO Report — {state['site_url']}",
        body=state["report"],
    )
    return {**state, "delivered": True}


def route_after_fetch(state: SEOState) -> str:
    return END if state.get("error") else "analyze"


def build_graph():
    g = StateGraph(SEOState)
    g.add_node("fetch", node_fetch)
    g.add_node("analyze", node_analyze)
    g.add_node("report", node_report)
    g.add_node("deliver", node_deliver)
    g.set_entry_point("fetch")
    g.add_conditional_edges("fetch", route_after_fetch, {"analyze": "analyze", END: END})
    g.add_edge("analyze", "report")
    g.add_edge("report", "deliver")
    g.add_edge("deliver", END)
    return g.compile()
