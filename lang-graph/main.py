import os
import sys
from dotenv import load_dotenv
from graph import build_graph

load_dotenv()


def main():
    graph = build_graph()
    result = graph.invoke({
        "site_url": os.environ["GSC_SITE_URL"],
        "days": int(os.environ.get("REPORT_DAYS", "28")),
        "current": [],
        "previous": [],
        "analysis": {},
        "report": "",
        "delivered": False,
        "error": None,
    })

    if result.get("error"):
        print(f"Error: {result['error']}", file=sys.stderr)
        sys.exit(1)

    print(result["report"])

    if result.get("delivered"):
        print(f"\nReport sent to {os.environ['REPORT_EMAIL']}")


if __name__ == "__main__":
    main()
