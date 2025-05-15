from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from backend import models
from backend.database import engine, get_db
from backend.schemas import EventCreate  
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func


app = FastAPI(root_path="/mini-analytics/api")
# app = FastAPI()

#  frontend (Vite) connecting  to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

@app.post("/events")
def post_event(event: EventCreate, db: Session = Depends(get_db)):
    new_event = models.Event(
        event_type=event.event_type,
        session_id=event.session_id,
        page=event.page,
        user_id=event.user_id,
        timestamp=event.timestamp or datetime.utcnow(),
        session_duration=event.session_duration,
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return {"message": "Event created", "event_id": new_event.id}

@app.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    total_events = db.query(func.count(models.Event.id)).scalar()

    avg_session_time = db.query(func.avg(models.Event.session_duration)).scalar()
    avg_session_time = round(avg_session_time or 0, 2)

    top_pages = (
        db.query(models.Event.event_type, func.count(models.Event.event_type))
        .group_by(models.Event.event_type)
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



