from fastapi import FastAPI
from backend.models import Event
from backend.storage import add_event, get_all_events
from backend.analytics import get_analytics
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/events")
def post_event(event: Event):
    add_event(event)
    return {"status": "received"}

@app.get("/analytics")
def analytics():
    return get_analytics()
