from pydantic import BaseModel

class Event(BaseModel):
    user_id: str
    page: str
    duration: float
    timestamp: str