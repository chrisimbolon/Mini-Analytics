from backend.storage import get_all_events
from collections import Counter

def get_analytics():
    data = get_all_events()
    total_events = len(data)
    top_pages = Counter([e.page for e in data]).most_common(3)
    avg_session = sum(e.duration for e in data) / total_events if total_events else 0
    return {
        "total_events": total_events,
        "top_pages": top_pages,
        "avg_session_time": round(avg_session, 2)
    }
