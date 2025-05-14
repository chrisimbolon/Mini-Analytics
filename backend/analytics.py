from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.models import Event
from backend.database import get_db

router = APIRouter()

@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    total_events = db.query(func.count(Event.id)).scalar()

    avg_session_time = db.query(func.avg(Event.session_duration)).scalar()
    avg_session_time = round(avg_session_time or 0, 2)

    top_pages = (
        db.query(Event.event_type, func.count(Event.event_type))
        .group_by(Event.event_type)
        .all()
    )

    return {
        "total_events": total_events,
        "avg_session_time": avg_session_time,
        "top_pages": [
            {"event_type": event_type, "count": count}
            for event_type, count in top_pages
        ]
    }
